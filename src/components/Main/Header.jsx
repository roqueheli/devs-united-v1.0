import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import { logout } from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import '../../styles/header.css';

function Header() {
    const images = require.context('../../../public/images', true);
    const { user, color, setColor } = useContext(FirestoreContext);
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    const handleBack = (e) => {
        e.preventDefault();
        setColor("");
        history.push('/');
    }

    return (
        <header className="header_agrupation">
            <div className="empty_header_">
                <img onClick={handleBack} src={images('./back.svg').default} alt="" />
            </div>
            <div className="header_container">
                <img onClick={() => history.push('/favorites')} className="header_avatar" style={{ border: `2px solid ${color.hex}`}} src={user ? user.photoURL : localStorage.getItem('userPhotoURL')} alt="" />
                <img src={images('./logo_small.svg').default} alt="" />
                <img className="header_title" src={images('./title.svg').default} alt="" />
            </div>
            <div className="logout_header">
                <button className="logout_header_button" onClick={handleLogout}>{`Logout`}<FontAwesomeIcon className="fa-sign-out" icon={faSignOutAlt} /></button>
            </div>
        </header>
    )
}

export default Header;
