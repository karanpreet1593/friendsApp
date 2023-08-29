import './home.styles.scss'
import { useState, useEffect } from 'react';
import FeedsContainer from '../../components/feedsContainer/feedsContainer.component';
import PostDialogue from '../../components/post-dialogue/post-dialogue.components';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";
import CreatePostDialog from '../../components/create-post-dialog/create-post-dialog.component';
import { userContext } from "../../context/user.context";
import { useContext } from 'react'
import ContactsList from '../../components/contacts-list/contacts-list-component';

const Home = () => {
    const {currentUser} = useContext(userContext)
    const [openDialog, handleDisplay] = useState(false);

    const handleClose = () => {
        handleDisplay(false);
     };
  
     const openDialogBox = () => {
        handleDisplay(true);
     };
     const dialogStyle = {
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
                    <DialogTitle style={dialogStyle}> Create Post </DialogTitle>
                    <CreatePostDialog currentUser={currentUser} closeDialog={handleClose}/>
                </Dialog>
                <PostDialogue
                 openDialogue={openDialogBox}
                 displayName={currentUser.displayName}
                 />
                <FeedsContainer/>
            </div>
            <div className='child contacts-container'>
            <ContactsList />
            </div>
        </div>
    );
}

export default Home
