import './post-dialogue.styles.scss'
import { userContext } from "../../context/user.context";
import { useContext } from 'react';

const PostDialogue = ({openDialogue, displayName}) => {
    const {currentUser} = useContext(userContext)

    return(
        <div className='post-dialogue-container'>
            <div className='post-dialogue-img-input-container' >
                <div className='profile-image'>
                    <img className='img'
                    src={currentUser.photoURL}
                    alt="profile-pic-icon"
                    />
                </div>
                <div className='post-d-placeholder'
                onClick={openDialogue}
                >
                <p>{`What's on your mind, ${displayName}?`}</p>
                </div>
            </div>
            <div className='line' ></div>
            
        </div>
    );

}

export default PostDialogue