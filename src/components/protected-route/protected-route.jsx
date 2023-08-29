import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../../context/user.context";
import { useContext } from 'react';

const ProtectedRoutes = () => {
    const {currentUser} = useContext(userContext)
  
  return(
    currentUser ? <Outlet/> : <Navigate to='/' />
  )
};

export default ProtectedRoutes