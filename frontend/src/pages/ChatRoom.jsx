import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { FireStoreDB } from "../main";
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";

function ChatMessage(props) {
  const { user } = useContext(AuthContext);

  const { text, uid } = props.message;
  const messageClass = uid === user.uid ? "sent" : "recieved";

  return (
    <div className={`ChatRoom-message-${messageClass}`}>
      <p>{text}</p>
    </div>
  );
}

export default function ChatRoom({ roomID }) {
  const { user } = useContext(AuthContext);

  const [inputVal, setInputVal] = useState("");

  // TODO: this is hardcoded and needs to be changed
  const messagesRef = collection(
    FireStoreDB,
    "chatrooms/fb1ySYptpvDmB6pUNzHb/messages"
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

  return (
    <>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button type="submit">🎡</button>
      </form>
    </>
  );
}
