import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { FireStoreDB } from "../main";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";

function ChatMessage(props) {
  const { user } = useContext(AuthContext);

  const { text, uid } = props.message;
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <div className={`ChatRoom-message-${messageClass}`}>
      <p class="Chat-message">{text}</p>
    </div>
  );
}

export default function ChatRoom({ roomID }) {
  const { user } = useContext(AuthContext);
  const { chatID } = useParams();
  const [inputVal, setInputVal] = useState("");
  const [roomName, setRoomName] = useState('')

  // TODO: this is hardcoded and needs to be changed
  const messagesRef = collection(
    FireStoreDB,
    `chatrooms/${chatID}/messages`
  );
  const q = query(messagesRef, orderBy("createdAt"), limit(30));

  const [messages] = useCollectionData(q);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      createdAt: serverTimestamp(),
      text: inputVal,
      uid: user.uid,
    });
  };

  const getRoomData =  async () => {
    const docSnap = await getDoc(doc(FireStoreDB, 'chatrooms', chatID))
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
    setRoomName(docSnap.data().movie + " Chat Room")
  }

  useEffect(() => {
    getRoomData();
  }, [])


  /*
  return (
    <>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputVal}
          class="Chat-input"
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button type="submit" class = "Submit-button">🎡</button>
      </form>
    </>
  );
  */

  return (
    <>
      <div className="Home-content">
        <div className="Chat-name-box">
          <h1>{roomName}</h1>
        </div>
        <div className="Chat-room">
          <div className="Msg-list">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
          <form
            onSubmit={sendMessage}
            style={{
              marginBottom: "1em",
            }}
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              className="Msg-box"
            />
            <button type="submit" className="Send-button">
              🎡
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
