import React, { useState, useEffect, createContext } from "react";
import { firestore, auth } from '../firebase/firebase';

export const FirestoreContext = createContext();

export default function FirestoreProvider({ children }) {
  const [message, setMessage] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesfeed, setFavoritesFeed] = useState([]);
  const [color, setColor] = useState({});
  const [nickname, setNickname] = useState("");
  const [userfeed, setUserFeed] = useState("");
  const [button, setButton] = useState(false);
  const [user, setUser] = useState(null);
  const [like_, setLike] = useState({});
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

  useEffect(() => {
    const unsuscribe = firestore.collection("usertweets")
    .onSnapshot((snapshot) => {
      const favorites = snapshot.docs.map((doc) => {
        return {
          tweetlike: doc.data().tweetlike
        };
      });
      setFavoritesFeed(favorites);
    });
  
    return () => unsuscribe();
  }, []);

    const likeUserTweet = (usertweet) => {
      let likeTweet = {
       tweetlike: usertweet
    };

    let send = firestore.collection("usertweets").add(likeTweet);
    let getDoc = send.then((docRef) => docRef.get());
    getDoc.then((doc) => {
      let newLike = {
        id: doc.id,
        tweetlike: doc.data().tweetlike
      }
      setFavoritesFeed([newLike, ...favoritesfeed]);
    });
  }

  const unlikeUserTweet = (usertweet) => {
    const unsuscribe = firestore.collection("usertweets")
    .onSnapshot((snapshot) => {
      const liketweet_ = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          tweetlike: doc.data().tweetlike
        };
      });

      const userlikefilter = liketweet_.filter((tweetsLiked) => tweetsLiked.tweetlike.tweetid === usertweet.tweetid && tweetsLiked.tweetlike.uid === usertweet.uid)
      const uniqueid = userlikefilter[0];

      const newTweets = liketweet_.filter((tweetli) => tweetli.tweetlike.tweetid !== usertweet.tweetid && tweetli.tweetlike.uid !== usertweet.uid);
      setFavoritesFeed(newTweets);

      try {
        firestore.doc(`usertweets/${uniqueid.id}`).delete();
      }
      catch(e){
        console.log(e.message);
      }
    });
    
    return () => unsuscribe();
  }

  const likeTweet = (id, numLikes, uid) => {
    const usertweet = {
      tweetid: id,
      uid: uid
    };
    
    let checklike = favoritesfeed.find(favorites => favorites.tweetlike.tweetid === id && favorites.tweetlike.uid === uid);

    if (!numLikes) numLikes = 0;
    if (!checklike) checklike = "";

    setLike(checklike);

    if (checklike !== "") {
      unlikeUserTweet(usertweet);
      firestore.doc(`tweets/${id}`).update({ likes : numLikes - 1 });
    } else
    {
      likeUserTweet(usertweet);
      firestore.doc(`tweets/${id}`).update({ likes : numLikes + 1 });
    };
  }

  const deleteTweet = (id) => {
    const newTweets = message.filter((tweet) => tweet.id !== id);
    setMessage(newTweets);
    firestore.doc(`tweets/${id}`).delete();
  }

  const checkingLike = (id, uid) => {
    let checklike = favoritesfeed.filter((favorites) => favorites.tweetlike.tweetid === id && favorites.tweetlike.uid === uid);
    if (checklike.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <FirestoreContext.Provider value={ { message, setMessage, user, setUser, tweet, setTweet, color, setColor, nickname, setNickname, like_, setLike, button, setButton, favorites, setFavorites, userfeed, setUserFeed, favoritesfeed, setFavoritesFeed, likeUserTweet, unlikeUserTweet, likeTweet, deleteTweet, checkingLike } }>
      {children}
    </FirestoreContext.Provider>
  );
}