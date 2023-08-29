import './authentication.styles.scss'
import SignIn from '../../components/sign-in/sign-in.components';
import SignUp from '../../components/sign-up/sign-up.component';

const Authentication = () => {
    return(
        <div className='authentication-container'>
            <SignIn/>
            <SignUp/>
        </div>
    );

}

export default Authentication