import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import { useHistory } from "react-router-dom";
import Loading from '../Loader/Loading';
import '../../styles/feed.css';

function Feed() {
    const images = require.context('../../../public/images', true);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const { user, message, setUserFeed, checkingLike, likeTweet, loading, handleDelete } = useContext(FirestoreContext);
    const messageOrdered = message.sort((a, b) => (b.timeStamp.toDate() - a.timeStamp.toDate()));
    const history = useHistory();

    const handleUserFeed = (userfeedtweet) => {
      setUserFeed(userfeedtweet);
      history.push('/userfeed');
    }

    const MainFeed = () => {
      return (
        <div className="post_container">
        {messageOrdered.map((tweet, index) => {
          return (
            <div key={index}>
              <div className="post">
                <div onClick={() => handleUserFeed(tweet)} className="post__avatar">
                  <img src={tweet.photoURL} alt="" />
                </div>
                <div className="post__body">
                  <div className="post__header">
                    <div className="post__headerText">
                        <h3 style={{ background: `${tweet.color.hex}`}}>{tweet.nickname.toLowerCase()}<span className="material-icons post__badge"></span></h3>
                        <p> - {tweet.date.toDate().getDate()} {months[tweet.date.toDate().getMonth()].slice(0, 3).toLocaleLowerCase()}.</p>
                    </div>
                    <div>
                      <p>{tweet.tweet}</p>
                      <p className="post__headerDescription">{tweet.email}</p>
                    </div>
                  </div>
                  <span className="span_img" onClick={() => likeTweet(tweet.id, tweet.likes, user.uid)}><img src={checkingLike(tweet.id, user.uid) === true ? images('./like.svg').default : images('./nlike.svg').default} alt="" />{tweet.likes ? tweet.likes : 0}</span>
                </div>
                <div className="delete_box">
                    {tweet.uid === user.uid ?
                    <button onClick={() => handleDelete(tweet.id)}><img src={images('./delete.svg').default} alt="" /></button> : null}
                </div>
              </div>
              <p className="line"></p>
            </div>
          )}
        )}
      </div>
      );
    };

    return (
      !loading ? <Loading /> : <MainFeed />
    )
}

export default Feed;
