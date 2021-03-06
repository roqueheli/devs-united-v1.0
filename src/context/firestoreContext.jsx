import React, { useState, useEffect, createContext } from "react";
import { firestore, auth, logout } from '../firebase/firebase';
import { useHistory } from "react-router-dom";

export const FirestoreContext = createContext();

export default function FirestoreProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesfeed, setFavoritesFeed] = useState([]);
  const [color, setColor] = useState({});
  const [nickname, setNickname] = useState("");
  const [userfeed, setUserFeed] = useState("");
  const [button, setButton] = useState(false);
  const [user, setUser] = useState(null);
  const [like_, setLike_] = useState({});
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
  const history = useHistory();

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
      setLoading(true);
    });

    auth.onAuthStateChanged((user) => {
      setUser(user);
      try {
        localStorage.setItem('userPhotoURL', user.photoURL);
      } catch (e) {
        
      };
    });
  
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const unsuscribe = firestore.collection("usertweets")
    .onSnapshot((snapshot) => {
      const favorite = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          tweetlike: doc.data().tweetlike
        };
      });
      setFavoritesFeed(favorite);
      setLoading(true);
    });
  
    return () => unsuscribe();
  }, []);

  const tweetsToDelete = favoritesfeed.filter((tweetsLiked) => !message.some((fav) => fav.id === tweetsLiked.tweetlike.tweetid));
  useEffect(() => {
    tweetsToDelete.map((erase) => {
      firestore.doc(`usertweets/${erase.id}`).delete();
      return erase;
    });
  }, [tweetsToDelete]);

  const checkingLike = (id, uid) => {
    let checklike = favoritesfeed.filter((favorites) => favorites.tweetlike.tweetid === id && favorites.tweetlike.uid === uid);
    if (checklike.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  const likeTweet = (id, numLikes, uid) => {
    const usertweet = {
      tweetid: id,
      uid: uid
    };

    let checklike = favoritesfeed.find((favorite) => favorite.tweetlike.tweetid === id && favorite.tweetlike.uid === uid);

    if (!numLikes) numLikes = 0;
    if (!checklike) checklike = "";

    if (checklike !== "") {
      unlikeUserTweet(usertweet);
      firestore.doc(`tweets/${id}`).update({ likes : numLikes - 1 });
    } else
    {
      likeUserTweet(usertweet);
      firestore.doc(`tweets/${id}`).update({ likes : numLikes + 1 });
    };
  }

  const likeUserTweet = (usertweet) => {
    let likeTweet = {
      id: "",
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
      const userlikefilter = favoritesfeed.filter((tweetsLiked) => tweetsLiked.tweetlike.tweetid === usertweet.tweetid && tweetsLiked.tweetlike.uid === usertweet.uid);
      const uniqueid = userlikefilter[0];
      const newFavorites = favorites.filter((tweet) => tweet.id !== usertweet.tweetid);
      setFavorites(newFavorites);  
      firestore.doc(`usertweets/${uniqueid.id}`).delete();
  };

  const deleteTweet = (id) => {
    const tweetlike__ = message.filter((tweet) => tweet.id === id);
    const newTweets = message.filter((tweet) => tweet.id !== id);
    setMessage(newTweets);
    const newFavorites = favorites.filter((tweet) => tweet.id !== id);
    setFavorites(newFavorites);
    firestore.doc(`tweets/${id}`).delete();
    const userlikefilter = favoritesfeed.filter((tweetsLiked) => tweetlike__.some((fav) => fav.id === tweetsLiked.tweetlike.tweetid && tweetsLiked.tweetlike.uid === fav.uid));
    if (userlikefilter.length > 0) {
      const uniqueid = userlikefilter[0];
      firestore.doc(`usertweets/${uniqueid.id}`).delete();
    }
  }

  const handleDelete = (id) => window.confirm('Are you sure you wish to delete this item?') ? deleteTweet(id) : null;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setColor("");
    history.push('/');
  }

  return (
    <FirestoreContext.Provider value={ { message, setMessage, user, setUser, tweet, setTweet, color, setColor, nickname, setNickname, like_, setLike_, button, setButton, favorites, setFavorites, userfeed, setUserFeed, favoritesfeed, setFavoritesFeed, likeUserTweet, unlikeUserTweet, likeTweet, deleteTweet, checkingLike, loading, setLoading, handleDelete, handleLogout } }>
      {children}
    </FirestoreContext.Provider>
  );
}