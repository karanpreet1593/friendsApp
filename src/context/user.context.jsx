import { createContext, useState, useEffect } from "react";  
import { onAuthStateChangedListner, createUserDocumentFromAuth,getUserDoc } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {

const [currentUser, setCurrentUser] = useState(null)
const value = {currentUser, setCurrentUser}
const navigate = useNavigate()

useEffect(()=>{
   const unsubscribe = onAuthStateChangedListner((authUser)=>{
    if(authUser) {
        createUserDocumentFromAuth(authUser)

        const userFromBackend = async () => {
            const user = await getUserDoc(authUser)
            setCurrentUser(user)
            console.log(user.displayName, "is logged in !")
            navigate('/home')
        }
        userFromBackend()
    }
  
   })
   return unsubscribe
}, [])

    return<userContext.Provider value={value} >{children}</userContext.Provider>
}