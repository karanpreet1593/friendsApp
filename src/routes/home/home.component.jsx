import './home.styles.scss'
import { useState, useEffect } from 'react';
import PostDialogue from '../../components/post-dialogue/post-dialogue.components';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CreatePostDialog from '../../components/create-post-dialog/create-post-dialog.component';
import { userContext } from "../../context/user.context";
import { PostsContext } from '../../context/posts.context';
import { useContext } from 'react'
import ContactsList from '../../components/contacts-list/contacts-list-component';
import Post from '../../components/post/post.component';
import PostDetail from '../../components/post-detail-dialog/post-detail.component';

const Home = () => {
    const {currentUser} = useContext(userContext)
    const {postsArray} = useContext(PostsContext)
    const [openDialog, handleDisplay] = useState(false);

    const handleClose = () => {
        handleDisplay(false);
     };
  
     const openDialogBox = () => {
        handleDisplay(true);
     };
     const dialogTitleStyle = {
        padding: "20px",
        paddingLeft: "190px",
        paddingBottom: "0px",
        fontWeight: "bold"
     };

    return(
        <div className="home-container">
            <div className='child shortcuts-container'>
                Shortcuts
            </div>
            <div className='middle-container'>
                <Dialog onClose = {handleClose} open = {openDialog}>
                    <DialogTitle style={dialogTitleStyle}> Create Post </DialogTitle>
                    <CreatePostDialog currentUser={currentUser} closeDialog={handleClose}/>
                </Dialog>
                <PostDialogue
                 openDialogue={openDialogBox}
                 displayName={currentUser.displayName}
                 />
                 {
                    postsArray.map((post)=><Post key={post.postID} post={post} />)
                 }
            </div>
            <div className='child contacts-container'>
            <ContactsList />
            </div>
        </div>
    );
}

export default Home
