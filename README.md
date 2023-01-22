# Cinematch

# About

With CineMatch, meet and chat with people who share your taste in movies and TV shows! Just enter your favorites and wait for CineMatch to connect you to your new entertainment best friend.

## Inspiration

Our inspiration comes from times when we had just finished an amazing movie or tv show but had no one to talk to about it because our friends and family have not seen or do not want to watch it.

## What it does

CineMatch starts when you input some of your favorite movies and shows you have recently watched into your collection. Then, CineMatch will randomly match you with someone else who has also favorited that show/movie from anywhere in the world, and you can chat for however long you want.

## How we built it

The main web framework we used was React + Vite. The search for entertainment options was done by connecting to OMDB (not a typo, an IMDB alternative) API. The data for all the users and chatrooms are stored on Firebase. Finally, the map was built using Google Maps API.

## Challenges we ran into

One major challenge we encountered was how to separate users into different chat rooms. We decided to pair users randomly because it was too complicated to only match users with others in the same area which was our original idea. Another challenge was integrating chat rooms into the Map API, as the map is not really built for these types of functions.

## Accomplishments that we're proud of

One accomplishment we are proud of is integrating chat rooms into the Map as described above. Also, we are proud of the dynamic design elements of the website.

## What we learned

As a group we learned a lot about how different design choices such as menu options and layouts can have a big impact on the look and feel of a website. We also became much more experienced with sending data back and forth between the Firebase server and the website.

## What's next for CineMatch

In the future, we would like to make the chatrooms on the map more fully functional and improve the process by which we match users with others they would like to chat with. Another aspect to improve is a system to keep users' data secure and moderate chats to keep everyone safe. Lastly, the cinemap could use a bit of overhaul by displaying chat room stats and information
