import './feedsContainer.styles.scss'
import Post from '../post/post.component';
import { PostsContext } from '../../context/posts.context';
import { useContext } from 'react';

const FeedsContainer = () => {
    const {postsArray} = useContext(PostsContext)

    return(
        <div className='feeds-container'>
         {
            postsArray.map((post)=><Post key={post.postID} post={post}/>)
         }
        </div>
    );
}

export default FeedsContainer