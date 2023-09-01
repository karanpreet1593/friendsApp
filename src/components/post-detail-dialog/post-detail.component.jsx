import './post-detail.styles.scss'
import Post from '../post/post.component';
import likeImg from '../../assets/like.png'
import likeBtnImg from '../../assets/likebtn.png'
import commentImg from '../../assets/comment.png'
import Message from '../messenger-chat/message.component';
import Comment from '../comment/comment.component';
import sendBtnPic from '../../assets/send-message.png'
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from '../../utils/firebase.utils';
import { useState } from 'react';
import { v4 as uuid } from "uuid";


 
const PostDetail = ({post, isLiked, handleLike, currentUser}) => {
    const [commentInputText, setCommentInputText] = useState('')

    const handleOnChange = (event) => {
        event.preventDefault()
        setCommentInputText(event.target.value)
    }


    const handleCommentSend = async () => { 
        const postCommentRef = doc(db, "posts", `${post.postID}`);
        const userPostCommentRef = doc(db, "users",`${post.userID}`,"posts",`${post.postID}`);
        const commentID = uuid()
        try {
               await updateDoc(postCommentRef, {
                   comments: arrayUnion({
                    id: commentID,
                    commentContent: commentInputText ,
                    username: currentUser.displayName,
                    usernamePhotoURL: currentUser.photoURL
                   })
               });
               await updateDoc(userPostCommentRef, {
                    id: commentID,
                    comments: arrayUnion({
                    commentContent: commentInputText ,
                    username: currentUser.displayName,
                    usernamePhotoURL: currentUser.photoURL
                   })
               });
               setCommentInputText('')
        } catch(e) {
           console.log("Like unsuccessful", e)
        }
   }
   const handleKey = (e) => {
    e.code === "Enter" && handleCommentSend();
  };

    return(
        <div className='PostDetail-container'>
            <div className='PostDetail-header'>
                <p>{`${post.username}'s Post`}</p>
            </div>
            <div className='PostDetail-body'>
                <div className='postDetailBody-header'>
                    <div className='postDetailBody-profile-image'>
                        <img className='img'
                        src={post.photoURL}
                        alt="profile-pic-icon"
                        />
                    <h4>{`${post.username}`}</h4>
                    </div>
                    <span>{`${post.createdAt}`}</span>
                </div>
                {post.postImageURL &&
                    <div className='postDetailBody-image'>
                    <img src={post.postImageURL} alt=''/>
                    </div>}
                <div className='postDetailBody-content'>
                <p>{post.post}</p>
                </div>
                <div className='postDetailBody-like-comment-info-container'>
                    <div className='postDetailBody-likes-container'>
                        <img  src={likeImg} alt='' />
                        <p>{post.whoLikedArray ? 
                            ` ${post.whoLikedArray.length}`
                            : ''
                        }</p>
                     </div>
                    <div className='postDetailBody-likes-container'>
                        <p>{`${post.comments.length}`}</p>
                        <span>comments</span>
                    </div>
                 </div>
                <div className='postDetailBody-like-comment-buttons-container'>
                    <div onClick={handleLike} className='postDetailBody-likes-btn-container'>
                        <img  src={likeBtnImg} alt='' />
                        <p>{ isLiked ? 'Unlike' : 'Like'
                        }</p>
                    </div>
                    <div className='postDetailBody-likes-btn-container'>
                        <img src={commentImg} alt='' />
                        <p>Comment</p>
                    </div>
                </div>
                <div className='postDetailBody-allComments'>
                    {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </div>
            </div>
            <div className='PostDetail-comment-input'>
                <input
                    value={commentInputText}
                    onChange={handleOnChange}
                    onKeyDown={handleKey}
                    placeholder='Write a comment...'
                />
                <img onClick={handleCommentSend} src={sendBtnPic} alt='' />
            </div>
        </div>
    );
}
export default PostDetail