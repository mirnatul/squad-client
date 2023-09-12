import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';
import TaskBoard from '../../components/TaskBoard/TaskBoard';
import useTask from '../../hooks/useTask';
import { AuthContext } from '../../provider/AuthProvider';

const TodoDoingDone = () => {

    const boardData = useLoaderData()
    const { user } = useContext(AuthContext)

    // console.log(boardData.mentioned.includes(user.email));
    const mentioned = boardData.mentioned.includes(user.email)

    const [tasks] = useTask()


    const toDo = tasks && tasks.filter(each => each.role === 'To Do')
    const doing = tasks && tasks.filter(each => each.role === 'Doing')
    const done = tasks && tasks.filter(each => each.role === 'Done')


    return (
        <div>
            <HeadingOfPage heading={`${boardData?.boardName}`}></HeadingOfPage>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:gap-6 md:gap-4 space-y-8 md:space-y-0 w-full mx-auto'>
                <TaskBoard className='md:w-1/3' data={toDo} role={'To Do'} color={'border-t-red-500'} textCol={'text-red-500'} id={boardData._id} count={toDo.length} owner={boardData.owner} mentioned={mentioned}></TaskBoard>
                <TaskBoard className='md:w-1/3' data={doing} role={'Doing'} color={'border-t-blue-500'} textCol={'text-blue-500'} id={boardData._id} count={doing.length} owner={boardData.owner} mentioned={mentioned}></TaskBoard>
                <TaskBoard className='md:w-1/3' data={done} role={'Done'} color={'border-t-green-500'} textCol={'text-green-500'} id={boardData._id} count={done.length} owner={boardData.owner} mentioned={mentioned}></TaskBoard>
            </div>
        </div>
    );
};

export default TodoDoingDone;