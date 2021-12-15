import React, { useState, useEffect, createContext } from "react";
import { firestore, auth } from '../firebase/firebase';

export const FirestoreContext = createContext();

export default function FirestoreProvider({ children }) {
    const [message, setMessage] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [color, setColor] = useState({});
    const [nickname, setNickname] = useState("");
    const [ button, setButton ] = useState(false);
    const [user, setUser] = useState(null);
    const [like, setLike] = useState(false);
    const [tweet, setTweet] = useState({
      tweet: "",
      user: "",
      nickname: "",
      email: "",
      like: "",
      likes: "",
      uid: "",
      color: "",
      photoURL: "",
      date: new Date(),
      timeStamp: new Date()
    });
  
    useEffect(() => {
      const unsuscribe = firestore.collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            user: doc.data().autor,
            nickname: doc.data().nickname.toLowerCase(),
            email: doc.data().email,
            like: doc.data().like,
            likes: doc.data().likes,
            uid: doc.data().uid,
            color: doc.data().color,
            photoURL: doc.data().photoURL,
            id: doc.id,
            date: doc.data().timeStamp,
            timeStamp: doc.data().timeStamp
          };
        });
        setMessage(tweets);
      });

      auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return () => unsuscribe();
    }, []);

  return (
    <FirestoreContext.Provider value={ { message, setMessage, user, setUser, tweet, setTweet, color, setColor, nickname, setNickname, like, setLike, button, setButton, favorites, setFavorites } }>
      {children}
    </FirestoreContext.Provider>
  );
}