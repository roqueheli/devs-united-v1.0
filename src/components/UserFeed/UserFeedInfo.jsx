import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import '../../styles/userinfo.css';

function UserInfo() {
  const { userfeed } = useContext(FirestoreContext);

  return (
    <nav className="tweetBox">
      <div className="tweetbox__">
        <img style={{ border: `2px solid ${userfeed.color.hex}`}} src={userfeed.photoURL} alt="" />
        <h3 style={{ background: `${userfeed.color.hex}`}}>{userfeed.nickname.toLowerCase()}</h3>
      </div>
    </nav>
    )
}

export default UserInfo;
