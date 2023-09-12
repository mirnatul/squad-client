import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './../../../provider/AuthProvider';

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                navigate(from, { replace: true })
            })
    }

    return (
        <div className='w-[300px] mx-auto'>
            <div className='divider'>OR</div>
            <div>
                <button onClick={handleGoogleSignIn} className='btn w-full bg-blue-600 hover:bg-blue-500 text-white'>Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;