import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import { firestore } from '../../firebase/firebase';
import '../../styles/tweetbox.css';

function Tweet() {
  const { user, message, setMessage, tweet, setTweet, nickname, color } = useContext(FirestoreContext);

  const handleTweet = (e) => {
      let newTweet = {
        tweet: e.target.value,
        uid: user.uid,
        email: user.email,
        autor: user.displayName,
        photoURL: user.photoURL,
        user: "",
        nickname: nickname,
        like: "",
        likes: "",
        color: color,
        date: new Date(),
        timeStamp: new Date()
      }
      setTweet(newTweet);
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      let send = firestore.collection("tweets").add(tweet);
      let getDoc = send.then((docRef) => docRef.get());
      getDoc.then((doc) => {
        let newTweet = {
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
        }
        setMessage([newTweet, ...message]);
      });
      setTweet({
          tweet: "",
          user: "",
          nickname: "",
          email: "",
          like: "",
          likes: "",
          uid: "",
          color: "",
          photoURL: ""
      });
    };

    return (
        <div className="tweetBox">
          <form>
            <div className="tweetbox__input">
                <div className="tweetbox_avatar">
                    <img src={user ? user.photoURL : localStorage.getItem('userPhotoURL')} alt="" />
                </div>
                <div className="tweetbox_textarea">
                    <textarea name="tweet" onChange={handleTweet} placeholder="What's happening?" value={tweet.tweet} maxLength="200" />
                    <div style={{ width: `${tweet.tweet.length/2}%`}} className="progress_bar" />
                    <div className="tweetbox_counters">
                        <span className="words_counters">{tweet.tweet.length}</span>
                        <span className="words_max">200 max.</span>
                    </div>
                </div>
            </div>
            <div className="tweet_post">
                <button onClick={handleSubmit} className="tweetBox__tweetButton">Post</button>
            </div>
          </form>
        </div>
    )
}

export default Tweet;
