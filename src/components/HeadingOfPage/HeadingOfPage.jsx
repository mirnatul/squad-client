import React from 'react';

const HeadingOfPage = ({ heading }) => {
    return (
        <div className='mt-2 md:mt-8'>
            <h2 className='text-3xl font-bold text-slate-700'>{heading}</h2>
            <div className='divider'></div>
        </div>
    );
};

export default HeadingOfPage;