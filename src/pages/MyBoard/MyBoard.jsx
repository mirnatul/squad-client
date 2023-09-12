import React, { useContext } from 'react';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';
import { BiTask } from 'react-icons/bi'
import { PiDotsThreeOutlineBold } from 'react-icons/pi'
import useBoard from '../../hooks/useBoard';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'

const MyBoard = () => {

    const [boards, refetch] = useBoard()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const myBoardData = boards.filter(eachBoard => eachBoard.owner === user.email)
    // console.log(myBoardData);

    const handleDeleteBoard = (_id) => {
        fetch(`https://squad-server.vercel.app/boards/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Board deleted successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                }
            })
    }

    return (
        <div>
            <HeadingOfPage heading={"My Board"}></HeadingOfPage>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
                {
                    myBoardData.map(singleItem => <div
                        key={singleItem._id}
                        className={`border-2 border-blue-200 p-4 rounded-md`}
                    >
                        <div className='relative h-[350px]'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <Link to={`/todo-doing-done/${singleItem._id}`} className='inline-flex items-center gap-1'><BiTask size={24} className='text-blue-600'></BiTask>
                                        <p className='font-bold text-lg text-blue-600 underline'>{singleItem?.boardName}</p>
                                    </Link>
                                    <div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="m-1 cursor-pointer">
                                                <div className="tooltip tooltip-top" data-tip="Edit or Delete">
                                                    <PiDotsThreeOutlineBold size={24} title='edit/delete'></PiDotsThreeOutlineBold>
                                                </div>
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-blue-200 w-28 font-semibold">
                                                <li><Link to={`/update-board/${singleItem._id}`}>Edit</Link></li>
                                                <li onClick={() => handleDeleteBoard(singleItem._id)}><Link>Delete</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-md font-bold text-slate-500 mt-0'>{singleItem?.companyName}</p>
                                <h4 className='mt-6 font-bold text-md text-blue-500'>About: </h4>
                                <p className='text-slate-500 text-sm'>{singleItem?.description}</p>
                            </div>
                            <div className='absolute bottom-0 w-full'>
                                <div className='divider'></div>
                                <p><span className='font-bold text-blue-500'>Date:</span> <span className='text-slate-500 font-semibold'>{singleItem?.time}</span></p>
                                <h3><span className='font-bold text-blue-500'>Creator:</span> <span className='text-slate-500 font-semibold'>{singleItem?.creator}</span></h3>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyBoard;