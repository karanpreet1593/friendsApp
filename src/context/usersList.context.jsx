import { createContext, useState, useEffect} from "react";  
import { getUsersAndDocuments } from "../utils/firebase.utils";
import { useContext } from 'react'
import { userContext } from './user.context'


export const userListContext = createContext({
  usersArray: []
});

export const UsersListProvider = ({ children }) => {
  const [usersArray, setUsersArray] = useState([]);
  const {currentUser} = useContext(userContext)


    useEffect(() => {
        const getUsersArray = async () => {
            const usersArray = await getUsersAndDocuments('users')
            // console.log(usersArray)
            setUsersArray(usersArray)
        }
        if(currentUser){
          getUsersArray()
        }
    }, [currentUser])

  const value = { usersArray };
  return (
    <userListContext.Provider value={value}>
      {children}
    </userListContext.Provider>
  );
};