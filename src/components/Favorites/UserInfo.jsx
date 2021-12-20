import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import '../../styles/userinfo.css';

function UserInfo() {
  const { user, nickname, color, button, setButton, message, setFavorites, favoritesfeed } = useContext(FirestoreContext);

  const handleButtonPosts = (e) => {
    e.preventDefault();
    setButton(false);
    const messagePosts = message.filter(({ uid }) => uid === user.uid);
    setFavorites(messagePosts);
  }

  const handleButtonFavorites = (e) => {
    e.preventDefault();
    setButton(true)
    const messageFavorites = message.filter((favs) => favoritesfeed.some((fav) => fav.tweetlike.tweetid === favs.id && user.uid === fav.tweetlike.uid));
    console.log(messageFavorites);
    setFavorites(messageFavorites);
  }

  return (
    <nav className="tweetBox">
      <div className="tweetbox__">
        <img style={{ border: `2px solid ${color.hex}`}} src={user.photoURL} alt="" />
        <h3 style={{ background: `${color.hex}`}}>{nickname.toLowerCase()}</h3>
      </div>
      <div className="userinfo_">
          <button onClick={handleButtonPosts} className={!button ? 'button1' : 'button2'}>POSTS</button>
          <button onClick={handleButtonFavorites} className={button ? 'button1' : 'button2'}>FAVORITES</button>
      </div>
    </nav>
    )
}

export default UserInfo;
