import './messenger-chat.styles.scss' 
import UserNameIcon from '../user-icon-name/user-name-icon.component';
import iconsCall from '../../assets/phone-call.png'
import iconVideoCall from '../../assets/zoom.png'
import attachment from '../../assets/attachment.png'
import imageGalleryPic from '../../assets/image-gallery.png'
import sendButtonPic from '../../assets/send-message.png'
import Message from './message.component';
import { ChatContext } from '../../context/chat.context';
import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../utils/firebase.utils';
import Input from './input';


const MessengerChat = () => {
    const { data } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const chatUserDisplayName = data.user.displayName

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);
    
    return(<>
            {chatUserDisplayName ?
                 <div className='messengerChat-container'>
                    <div className='messengerChat-header'>
                        <UserNameIcon user={data.user} />
                        <div className='messengerChat-icons'>
                            <img src={iconsCall} alt='phone-icon'/>
                            <img src= {iconVideoCall} alt='video-icon'/>
                        </div>
                    </div>

                    <div className='chat-container'>
                    {messages.map((m) => (
                        <Message message={m} key={m.id} />
                    ))}
                    </div>
                    
                    <Input/>
                </div> 
                : <div className= 'messengerChat-container-empty' >
                <p>Select a chat or start a new conversation</p>
                </div>
            }
        </>
    );
}

export default MessengerChat
