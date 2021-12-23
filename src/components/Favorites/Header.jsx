import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import '../../styles/favheader.css';

function Header() {
    const images = require.context('../../../public/images', true);
    const { nickname, handleLogout } = useContext(FirestoreContext);
    const history = useHistory();

    return (
        <header className="header_agrupation">
            <div className="empty_header">
                <img onClick={() => history.push('/main')} src={images('./back.svg').default} alt="" />
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
