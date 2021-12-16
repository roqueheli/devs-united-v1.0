import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import { logout } from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import '../../styles/favheader.css';

function Header() {
    const images = require.context('../../../public/images', true);
    const { nickname } = useContext(FirestoreContext);
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push('/');
    }

    return (
        <header className="header_agrupation">
            <div onClick={() => history.goBack()} className="empty_header">
                <img src={images('./back.svg').default} alt="" />
            </div>
            <div className="header_container">
                <h3 className="nickname_style">{nickname.toLowerCase()}</h3>
                <img className="header_title" src={images('./title.svg').default} alt="" />
            </div>
            <div className="logout_header">
                <button className="logout_header_button" onClick={handleLogout}>{`Logout`}<FontAwesomeIcon className="fa-sign-out" icon={faSignOutAlt} /></button>
            </div>
        </header>
    )
}

export default Header;
