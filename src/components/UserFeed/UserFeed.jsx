import React, { useContext } from 'react';
import { firestore } from '../../firebase/firebase';
import { FirestoreContext } from '../../context/firestoreContext';
import '../../styles/feed.css';

function UserFeed() {
    const images = require.context('../../../public/images', true);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const { user, message, setMessage, setLike, userfeed } = useContext(FirestoreContext);
    const userPosts = message.filter(({ uid }) => uid === userfeed.uid);
    const messageOrdered = userPosts.sort((a, b) => (b.timeStamp.toDate() - a.timeStamp.toDate()));

    const deleteTweet = (id) => {
        const newTweets = message.filter((tweet) => tweet.id !== id);
        setMessage(newTweets);
        firestore.doc(`tweets/${id}`).delete();
    }
    
    const likeTweet = (id, numLikes, like, uid) => {
        if ( !numLikes ) numLikes = 0;
        firestore.doc(`tweets/${id}`).update({ like : !like });
        setLike(like)
        like === true ? firestore.doc(`tweets/${id}`).update({ likes : numLikes - 1 }) : firestore.doc(`tweets/${id}`).update({ likes : numLikes + 1 });
    }

    return (
        <div className="post_container">
          {messageOrdered.map((tweet, index) => {
            return (
              <div key={index}>
                <div className="post">
                  <div className="post__avatar">
                    <img src={tweet.photoURL} alt="" />
                  </div>
                  <div className="post__body">
                    <div className="post__header">
                      <div className="post__headerText">
                          <h3 style={{ background: `${tweet.color.hex}`}}>{tweet.nickname.toLowerCase()}<span className="material-icons post__badge"></span></h3>
                          <p> - {tweet.date.toDate().getDate()} {months[tweet.date.toDate().getMonth()].slice(0, 3).toLocaleLowerCase()}.</p>
                      </div>
                      <div className="post__headerDescription">
                        <p>{tweet.tweet}</p>
                      </div>
                    </div>
                    <span className="span_img" onClick={() => likeTweet(tweet.id, tweet.likes, tweet.like, tweet.uid)}><img src={tweet.likes ? images('./like.svg').default : images('./nlike.svg').default} alt="" />{tweet.likes ? tweet.likes : 0}</span>
                  </div>
                  <div className="delete_box">
                      {tweet.uid === user.uid ?
                      <button onClick={() => deleteTweet(tweet.id)}><img src={images('./delete.svg').default} alt="" /></button> : null}
                  </div>
                </div>
                <p className="line"></p>
              </div>
            )}
          )}
        </div>
    )
}

export default UserFeed;
