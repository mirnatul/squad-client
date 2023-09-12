import React, { useContext } from 'react';
// import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { AuthContext } from './../../provider/AuthProvider';

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        Swal.fire(
                            'Good job!',
                            'Log in successful!',
                            'success'
                        )
                        navigate('/')
                    })
                    .catch(error => console.log(error))
            })
    }

    return (
        <div>
            {/* <Helmet><title>Sign Up | Bistro Boss</title></Helmet> */}
            <h2 className='text-center font-bold mt-10 mb-16 text-5xl'>Sign Up</h2>
            <form onSubmit={handleRegister} className='flex justify-center'>
                <div>
                    <div className='mb-4'>
                        <input type="text" placeholder="Name" name='name' className="input input-bordered w-[300px] max-w-xs" required />
                    </div>
                    <div className='mb-4'>
                        <input type="text" placeholder="PhotoURL" name='photoURL' className="input input-bordered w-[300px] max-w-xs" />
                    </div>
                    <div className='mb-4'>
                        <input type="email" placeholder="Email*" name='email' className="input input-bordered w-[300px] max-w-xs" required />
                    </div>
                    <div className='mb-4'>
                        <input type="password" placeholder="Password*" name='password' className="input input-bordered w-[300px] max-w-xs" required />
                    </div>
                    <div>
                        <input className='btn btn-outline w-full' type="submit" value="Sign Up" />
                    </div>
                </div>
            </form>
            <p className='text-center my-3'><small>Already have an account? <Link to='/login' className='text-lg text-blue-600 font-bold'>Login</Link></small></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default SignUp;