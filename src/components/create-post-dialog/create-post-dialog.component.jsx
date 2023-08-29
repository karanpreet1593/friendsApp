import { useState } from 'react';
import './create-post-dialog.styles.scss'
import Textarea from '@mui/joy/Textarea';
import { addUserPostDoc } from '../../utils/firebase.utils';

const CreatePostDialog = ({currentUser, closeDialog}) => {
    const [createPostText, setCreatePostText ] = useState('')

    const handleOnChange = (event) => {
        event.preventDefault()
        setCreatePostText(event.target.value)
    }

    const handleSubmitPost = async () => {
        if(createPostText.length === 0) return
        await addUserPostDoc(currentUser, createPostText)
        setCreatePostText('')
        closeDialog()
    }



    return(
        <div className='create-post-dialog-container'>
            <div className='create-post-dialog-header'>
                <div className='profile-image'>
                    <img className='img'
                    src={currentUser.photoURL}
                    alt="profile-pic-icon"
                    />
                </div>
                <h4>{`${currentUser.displayName}`}</h4>
            </div>
            <div className='create-post-body'>
            <Textarea 
                name="Plain"
                placeholder={`What's on your mind, ${currentUser.displayName} ?`}
                variant="plain"
                color='white'
                onChange={handleOnChange}
               />
            </div>
            <button onClick={handleSubmitPost}>Post</button>
        </div>
    );
}

export default CreatePostDialog;