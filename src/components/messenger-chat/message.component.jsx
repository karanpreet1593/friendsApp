 import './messenger-chat.styles.scss'
 import React, { useContext, useEffect, useRef } from "react";
import { userContext } from '../../context/user.context';
import { ChatContext } from '../../context/chat.context';

const Message = ({message}) => {

    const { currentUser } = useContext(userContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    }, [message]);

    return(
        <div ref={ref}
        className={`chatMessage-container ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img
                src={
                    message.senderId === currentUser.uid
                      ? currentUser.photoURL
                      : data.user.photoURL
                }
                alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
            </div>
        </div>  
    );
}
export default Message