import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading) return <LoadingSpinner></LoadingSpinner>
    if(user) return children
    return <Navigate to='/login' state={location.pathname}></Navigate>
        
};

export default PrivateRoutes;