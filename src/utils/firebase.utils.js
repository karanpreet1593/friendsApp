import {initializeApp} from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc, 
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    deleteDoc,
} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAlzMb6Nd7x4LTeUhJxldpj16HRXy9eUyc",
    authDomain: "friendsapp-9025c.firebaseapp.com",
    projectId: "friendsapp-9025c",
    storageBucket: "friendsapp-9025c.appspot.com",
    messagingSenderId: "244706911773",
    appId: "1:244706911773:web:4c4c00194280836a7948f4",
    measurementId: "G-LPHXEYEZ1E"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  export const auth = getAuth()

  export const db = getFirestore()

  export const storage = getStorage();

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
  }

  export const addUserPostDoc = async (
    userAuth,
    post,
    postImageURL = null,
    postImageStorageRefrence = null
    ) => {
    if (!userAuth || !post.length) return;

    const postID = Date.now()
    const userID = userAuth.uid
    const username = userAuth.displayName
    const photoURL = userAuth.photoURL
    const whoLikedArray = []
    const comments = []
    
    const userPostDocRef = doc(db, 'users', userID, 'posts', `${postID}`)
    const userPostSnapshot = await getDoc(userPostDocRef)

    const postDocRef = doc(db, 'posts', `${postID}`)

    if(!userPostSnapshot.exists()) {
        const createdAt = new Date().toLocaleDateString()
        
        try {
            await setDoc(userPostDocRef, {
                createdAt,
                post,
                postID,
                userID,
                username,
                photoURL,
                whoLikedArray,
                comments,
                postImageURL,
                postImageStorageRefrence
            })

            await setDoc(postDocRef, {
              createdAt,
              post,
              postID,
              userID,
              username,
              photoURL,
              whoLikedArray,
              comments,
              postImageURL,
              postImageStorageRefrence
          })

        } catch(error) {
            console.log('error creating post', error.message)
        }
    }

    return [userPostDocRef, postDocRef]
  }

  export const deletePostDoc = async (
    postID,
    userID,
    postImageStorageRefrence
  ) => {
    const postDocRef = doc(db, 'posts', `${postID}`)
    const userPostDocRef = doc(db, 'users', userID, 'posts', `${postID}`)
    const postImageRef = ref(storage, postImageStorageRefrence);

    try {
        await deleteDoc(postDocRef)
        await deleteDoc(userPostDocRef)
  
        deleteObject(postImageRef).then(() => {
          console.log("Filete deleted Successfully")
        }).catch((error) => {
          console.log("ErrorOccured while deleting storage file")
        });

    } catch (error) {
      console.log('error deleting post', error.message)
    }
  }

  export const getPostsAndDocuments = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef);
    let arr = []

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((docSnapshot) => {
     arr.push(docSnapshot.data())
   })
  
    return arr;
  };

  export const getUsersAndDocuments = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);
    const arr = []
  
    const querySnapshot = await getDocs(q);
     querySnapshot.docs.map((docSnapshot) => {
      // const { title, items } = docSnapshot.data();
      arr.push(docSnapshot.data())
      return arr
    })
    return arr;
  };

  export const getUserDoc = async (userAuth) => {
    const docRef = doc(db, "users", userAuth.uid);
    const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        console.log("No such document!");
    }
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)