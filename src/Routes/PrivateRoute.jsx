import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { RiseLoader } from 'react-spinners';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <RiseLoader
                color="#3B82F6"
                loading
                margin={2}
                size={15}
            />
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace={true}></Navigate>

};

export default PrivateRoute;