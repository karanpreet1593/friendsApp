import './post.styles.scss'
import likeImg from '../../assets/like.png'
import likeBtnImg from '../../assets/likebtn.png'
import commentImg from '../../assets/comment.png'
import { useState, useContext, useEffect } from 'react'
import { userContext } from '../../context/user.context'
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from '../../utils/firebase.utils'
import Dialog from "@mui/material/Dialog";
import PostDetail from '../post-detail-dialog/post-detail.component'
import closeBtnImg from '../../assets/close.png'
import { deletePostDoc } from '../../utils/firebase.utils'


const Post = ({post}) => {

    const{currentUser} = useContext(userContext)
    const [currentPost, setcurrentPost] = useState('false')
    const hasCurentUserLikedThisPost = post.whoLikedArray.includes(currentUser.displayName)
    const [isLiked, setIsLiked] = useState(hasCurentUserLikedThisPost)
    const [openDialog, handleDisplay] = useState(false);

    const openDialogBox = () => {
        handleDisplay(true);
     };

     const handleClose = () => {
        handleDisplay(false);
     };

    useEffect(() => {
        const getCurrentPostLiveData = () => {
          const unsub = onSnapshot(doc(db, "posts", `${post.postID}`), (doc) => {
            setcurrentPost(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
    
        post.postID && getCurrentPostLiveData();
      }, [post]);

    const handleLike = async () => { 
         const postLikeRef = doc(db, "posts", `${post.postID}`);
         const userPostLikeRef = doc(db, "users",`${post.userID}`,"posts",`${post.postID}`);
         try {
            if (!isLiked){
                await updateDoc(postLikeRef, {
                    whoLikedArray: arrayUnion(`${currentUser.displayName}`)
                });
                await updateDoc(userPostLikeRef, {
                    whoLikedArray: arrayUnion(`${currentUser.displayName}`)
                });
                setIsLiked(true)
                return
            } else {
                await updateDoc(postLikeRef, {
                    whoLikedArray: arrayRemove(`${currentUser.displayName}`)
                });
                await updateDoc(userPostLikeRef, {
                    whoLikedArray: arrayRemove(`${currentUser.displayName}`)
                });
                setIsLiked(false)
            }
         } catch(e) {
            console.log("Like unsuccessful", e)
         }
    }

    const handlePostDelete = async () => {
        await deletePostDoc(post.postID, currentUser.uid, post.postImageStorageRefrence)
    }

    return(
        <div className="post-container">
            <Dialog maxWidth='xl' onClose = {handleClose} open = {openDialog} >
                <PostDetail 
                isLiked = {isLiked}
                currentUser={currentUser}
                handleLike = {handleLike}
                post = {currentPost}/>
            </Dialog>
            <div className='post-header'>
                <div className='profile-image'>
                    <img className='img'
                    src={post.photoURL}
                    alt="profile-pic-icon"
                    />
                    <h4>{`${post.username}`}</h4>
                </div>
                <span>{`${post.createdAt}`}</span>
                {post.userID === currentUser.uid &&
                     <div onClick={handlePostDelete}
                        className='post-delete-btn' >
                        <img src={closeBtnImg} alt='' />
                     </div>}
            </div>
            {post.postImageURL &&
                <div className='post-image'>
                <img src={post.postImageURL} alt=''/>
                </div>}
            <div className='post-content'>
            <p>{post.post}</p>
            </div>
            <div className='like-comment-info-container'>
                <div className='likes-container'>
                    <img  src={likeImg} alt='' />
                    <p>{currentPost.whoLikedArray ? 
                        ` ${currentPost.whoLikedArray.length}`
                        : ''
                    }</p>
                </div>
                <div className='likes-container'>
                <p>{currentPost.comments ?
                    `${currentPost.comments.length}`
                    : "0"
                }</p>
                    <span>comments</span>
                </div>
            </div>
            <div className='like-comment-buttons-container'>
                <div onClick={handleLike} className='likes-btn-container'>
                    <img  src={likeBtnImg} alt='' />
                    <p>{ isLiked ? 'Unlike' : 'Like'
                    }</p>
                </div>
                <div onClick={openDialogBox} className='likes-btn-container'>
                    <img src={commentImg} alt='' />
                    <p>Comment</p>
                </div>
            </div>
        </div>
    );
}

export default Post