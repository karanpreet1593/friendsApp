import './post.styles.scss'

const Post = ({post}) => {
    return(
        <div className="post-container">
            <div className='post-header'>
                <div className='profile-image'>
                    <img className='img'
                    src={post.photoURL}
                    alt="profile-pic-icon"
                    />
                </div>
                <h4>{`${post.username}`}</h4>
            </div>
            <p>{post.post}</p>
        </div>
    );
}

export default Post