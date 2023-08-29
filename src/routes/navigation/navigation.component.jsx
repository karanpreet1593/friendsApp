import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss'
import {ReactComponent as FbLogo} from '../../assets/icons8-facebook.svg'
import {ReactComponent as MessengerLogo} from '../../assets/icons8-facebook-messenger.svg'
import { signOutUser } from "../../utils/firebase.utils";
import { userContext } from "../../context/user.context";
import { useContext } from 'react';


    

const Navigation = () => {
    const {currentUser} = useContext(userContext)

    return(
        <>
            <div className="navigation-container">
                <Link to='/home' className="logo-container">
                    <FbLogo/>
                </Link>
                <div className="nav-links-container">
                    <Link to='/' className="nav" onClick={signOutUser}>Logout</Link> 
                    <Link to='/home/messages' className="nav-link"><MessengerLogo/></Link> 
                    <Link to='/home/profile' className="nav-link">
                        <img
                        className="profile-image"
                         src={currentUser.photoURL}
                         alt="profile-pic-icon"
                         />
                    </Link> 
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default Navigation