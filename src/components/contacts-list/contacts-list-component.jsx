import './contacts-list.styles.scss'
import UserNameIcon from '../user-icon-name/user-name-icon.component';
import { userListContext } from '../../context/usersList.context';
import { useContext } from 'react'


const ContactsList = () => {
    const {usersArray} = useContext(userListContext)
    return(
        <div className="contacts-list-container">
        <h2 style={{textDecoration: "underline"}}>Contacts</h2>
        {
            usersArray.map((user, idx) => {
                return  <UserNameIcon key={idx}  user={user}/>
            })
        }
        </div>
    );
}

export default ContactsList