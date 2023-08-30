import { createContext, useState, useEffect} from "react";  
import { getPostsAndDocuments } from "../utils/firebase.utils";
import { useContext } from 'react'
import { userContext } from "./user.context";
import { db } from "../utils/firebase.utils";
import {
  getFirestore,
  doc, 
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  onSnapshot,
  setCaretubos
} from 'firebase/firestore'

export const PostsContext = createContext({
  postsArray: []
});

export const PostsProvider = ({ children }) => {
  const {currentUser} = useContext(userContext)
  const [postsArray, setpostsArray] = useState([]);

  useEffect(() => {
    const getPosts = () => {
      const collectionRef = collection(db, 'posts');
      const q = query(collectionRef);

      const unsub = onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.docs.forEach((doc)=>{
          posts.push(doc.data())
        })
        
        setpostsArray(posts.reverse());
        console.log(posts.length)
      });

      return () => {unsub();};
    };

    currentUser && getPosts();
  }, [currentUser]);

  const value = { postsArray };
  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};