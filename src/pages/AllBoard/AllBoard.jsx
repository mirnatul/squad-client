import React from 'react';
import { BiTask } from 'react-icons/bi';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';

import useBoard from '../../hooks/useBoard';
import { Link } from 'react-router-dom'


const AllBoard = () => {

    const [boards] = useBoard()

    const allBoardData = boards.filter(each => each.visibility === 'public')

    return (
        <div>
            <HeadingOfPage heading={"All Board"}></HeadingOfPage>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
                {
                    allBoardData.map(singleBoard => <div
                        key={singleBoard._id}
                        className={`border-2 border-blue-200 p-4 rounded-md`}
                    >
                        <div className='relative h-[350px]'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <div className='inline-flex items-center gap-1'><BiTask size={24} className='text-blue-600'></BiTask>
                                        <Link to={`/todo-doing-done/${singleBoard._id}`} className='font-bold text-lg text-blue-600 underline'>{singleBoard?.boardName}</Link>
                                    </div>
                                </div>
                                <p className='text-md font-bold text-slate-500 mt-0'>{singleBoard?.companyName}</p>
                                <h4 className='mt-6 font-bold text-md text-blue-500'>About:</h4>
                                <p className='text-slate-500 text-sm'>{singleBoard?.description}</p>
                            </div>
                            <div className='absolute bottom-0 w-full'>
                                <div className='divider'></div>
                                <p><span className='font-bold text-blue-500'>Date:</span> <span className='text-slate-500 font-semibold'>{singleBoard?.time}</span></p>
                                <h3><span className='font-bold text-blue-500'>Creator:</span> <span className='text-slate-500 font-semibold'>{singleBoard?.creator}</span></h3>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllBoard;