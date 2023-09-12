import React from 'react';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';

const ProjectCreator = () => {
    return (
        <div>
            <HeadingOfPage heading={"Project Creator"}></HeadingOfPage>
            <div className='grid justify-center items-center h-[400px]'>
                <div className='text-lg text-slate-500 text-center grid gap-3'>
                    <h2 className='text-3xl font-bold text-blue-500'>Md Mirnatul Islam</h2>
                    <h3 className='text-2xl font-bold text-slate-600'>MERN Stack Web Developer</h3>
                    <p>Email: www.mirnatul@gmail.com</p>
                    <p>Portfolio: https://mirnatul.netlify.app/</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCreator;