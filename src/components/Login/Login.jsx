import React, { useContext } from 'react';
import { loginGoogle, logout } from '../../firebase/firebase';
import { FirestoreContext } from '../../context/firestoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../helpers/colors";
import { useHistory } from "react-router-dom";
import '../../styles/login.css';

function Login() {
    const images = require.context('../../../public/images', true);
    const { user, color, setColor, nickname, setNickname } = useContext(FirestoreContext);
    const history = useHistory();

    const handleNickNameChange = (e) => {
        setNickname(e.target.value);
    }

    const handleContinue = (e) => {
        e.preventDefault();
        if (nickname && color) {
            history.push('/main')
        };
    }

    return (
        <div className="login_container">
            <div className="left">
                <img src={images('./logo.svg').default} alt="" />
            </div>
            <div className="login">
                <div className="login_subcontainer">
                    {user ? (
                        <>
                            <h1 className="logged_welcome">{`WELCOME `} <span>{user.displayName}</span></h1>
                            <input onChange={handleNickNameChange} type="text" name="nickname" id="nickname" placeholder="Type your username"/>
                            <p className="select_color">Select your favorite color</p>
                            <div className="color_box">
                                {colors.map((colorDiv, index) => {
                                    return (
                                        <div className="div_container" key={index}>
                                            <div  onClick={() => setColor(colorDiv)} className="grid_item" key={colorDiv.hex} style={{ backgroundColor: colorDiv.hex }} />
                                        </div>);
                                })}
                            </div>
                            <p className="select_color">Selected: {color.name}</p>
                            <button onClick={handleContinue} className="continue_button">CONTINUE</button>
                            <div className="logout_container">
                                <button className="logout_button" onClick={logout}>{`Logout`} <FontAwesomeIcon className="fa-sign-out-alt" icon={faSignOutAlt} /></button>
                            </div>
                        </>
                    ) : (    
                        <>    
                            <h1>WELCOME</h1>
                            <p className="login_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <button className='google_pointer' onClick={loginGoogle}>
                                <div className="google_image_container">
                                    <img src={images('./google.svg').default} alt="" />
                                </div>
                                <span className="login_span">Sign in with Google</span>
                            </button>
                        </>
                    )}
                </div>
                <p className="login_footer">{`© 2021 Devs_United - `}<span>BETA</span> </p>
            </div>
        </div>
    )
}

export default Login;
