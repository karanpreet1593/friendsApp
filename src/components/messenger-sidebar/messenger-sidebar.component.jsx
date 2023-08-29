import './messenger-sidebar.styles.scss';
import Search from '../chat-search/search.component';
import UserChats from '../user-chats/user-chats.component';


const MessengerSidebar = () => {
    return(
        <div className='messengerSidebar-container'>
            <h2>Chats</h2>
            <Search/>
            <UserChats/>
        </div>
    );
}
export default MessengerSidebar

 