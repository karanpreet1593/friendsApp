import { useState } from 'react';
import './create-post-dialog.styles.scss'
import Textarea from '@mui/joy/Textarea';
import { addUserPostDoc, db, storage } from '../../utils/firebase.utils';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import ImgUpload from '../../assets/image-gallery.png'



const CreatePostDialog = ({currentUser, closeDialog}) => {
    const [createPostText, setCreatePostText ] = useState('')
    const [img, setImg] = useState(null);

    const handleOnChange = (event) => {
        event.preventDefault()
        setCreatePostText(event.target.value)
    }

    const handleSubmitPost = async () => {
        if(createPostText.length === 0) return
        

        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            const postImageStorageRefPath = storageRef._location.path_
      
            uploadTask.on(
              (error) => {
                console.log('error uploading image in post ',error)
              },
             async() => {
                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await addUserPostDoc(currentUser, createPostText, downloadURL, postImageStorageRefPath)
                });
                console.log(" is storage ref",storageRef._location.path_)
              }
            );
            setImg(null)
          } else {
            await addUserPostDoc(currentUser, createPostText)
          }


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
            <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) =>{
                    setImg(e.target.files[0])
                    
                } }
            />
            <label htmlFor="file">
                <img className='upload' src={ImgUpload} alt="" />
            </label>
            <button onClick={handleSubmitPost}>Post</button>
        </div>
    );
}

export default CreatePostDialog;