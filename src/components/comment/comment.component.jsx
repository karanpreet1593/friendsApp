import './comment.styles.scss'
import React, { useEffect, useRef } from "react";

const Comment = ({comment}) => {
    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    }, [comment]);
    return(
        <div ref={ref}
        className='Comment-container'>
            <div className="commentInfo">
                <img src={comment.usernamePhotoURL} alt=""/>
                <span></span>
            </div>
            <div className="commentContent-container">
                <h5>{comment.username}</h5>
                <p>{comment.commentContent}</p>
            </div>
        </div> 
    );
}
export default Comment