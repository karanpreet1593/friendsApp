import './messenger.styles.scss'
import MessengerChat from '../../components/messenger-chat/messenger-chat.component';
import MessengerSidebar from '../../components/messenger-sidebar/messenger-sidebar.component';

const Messenger = () => {
    return(
        <div className="messenger-container">
            <MessengerSidebar/>
            <MessengerChat/>
        </div>
    );
}

export default Messenger