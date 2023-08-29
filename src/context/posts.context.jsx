import { createContext, useState, useEffect} from "react";  
import { getPostsAndDocuments } from "../utils/firebase.utils";
import { useContext } from 'react'
import { userContext } from "./user.context";

export const PostsContext = createContext({
  postsArray: []
});

export const PostsProvider = ({ children }) => {
  const {currentUser} = useContext(userContext)
  const [postsArray, setpostsArray] = useState([]);

    useEffect(() => {
        const getPostArray = async () => {
            const postArray = await getPostsAndDocuments('posts')
            // console.log(postArray)
            setpostsArray(postArray)
        }
        if(currentUser) {
          getPostArray()
        }
    }, [currentUser])

  const value = { postsArray };
  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};