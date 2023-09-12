import React, { useContext, useState } from 'react';
import { FcPlus, FcCancel, FcCheckmark } from 'react-icons/fc';
import useTask from '../../hooks/useTask';
import { GrEdit } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const TaskBoard = ({ role, color, id, data, count, owner, mentioned, textCol }) => {

    const { user } = useContext(AuthContext)
    const [, refetch] = useTask()
    const [openSection, setOpenSection] = useState(false)
    const [modalTitle, setModalTitle] = useState()
    const [modalDescription, setModalDescription] = useState()

    const handleConfirm = (e) => {
        e.preventDefault();
        setOpenSection(false)
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;

        const taskData = { boardId: id, role: role, title: title, description: description }

        fetch(`https://squad-server.vercel.app/tasks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                }
                refetch()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Task Created',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const handleTaskDelete = (id) => {
        fetch(`https://squad-server.vercel.app/single-task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Task Deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // role changing
    const makeRoleUpdate = (id, role) => {
        const updateRole = { role: role }
        fetch(`https://squad-server.vercel.app/single-task/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateRole)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log('data Posted');
                    refetch()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Role changed to >> ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleModalPopUpForTitle = (id) => {
        document.getElementById(id).showModal()
    }
    const handleModalPopUpForDescription = (id) => {
        document.getElementById(id).showModal()
    }

    const handleUpdateTaskDataTitle = (id) => {
        const updateTitleAndDescription = { title: modalTitle }
        fetch(`https://squad-server.vercel.app/single-task/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTitleAndDescription)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                }
            })
    }
    const handleUpdateTaskDataDescription = (id) => {
        const updateTitleAndDescription = { description: modalDescription }
        fetch(`https://squad-server.vercel.app/single-task-description/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTitleAndDescription)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                }
            })
    }

    return (
        <div className={`border-t-4 p-1 ${color}`}>
            <p className={`text-xl font-bold mt-2 mb-4 ${textCol}`}>{role} ({count})</p>
            <div>
                {
                    openSection &&
                    <form onSubmit={handleConfirm}>
                        <div className='mb-2 w-full'>
                            <input name='title' type="text" placeholder="Write Title" className="input mb-2 w-full" required /> <br />
                            <textarea name='description' className="textarea w-full" placeholder="Write Description" required></textarea>
                        </div>
                        <div className='flex gap-4 font-bold'>
                            <button type='submit' className='border-2 rounded-lg p-2 cursor-pointer inline-flex items-center gap-2 w-full hover:bg-green-200 text-green-500 border-green-300'><FcCheckmark size={20}></FcCheckmark> Confirm</button>
                            <button onClick={() => setOpenSection(false)} className='border-2 rounded-lg p-2 cursor-pointer inline-flex items-center gap-2 w-full hover:bg-red-200 text-red-600 border-red-300'><FcCancel size={20}></FcCancel> Cancel</button>
                        </div>
                    </form>
                }
            </div>
            {(owner === user.email || mentioned) && <div>
                {openSection || <div onClick={() => setOpenSection(true)} className='border-2 rounded-lg p-2 cursor-pointer inline-flex items-center gap-2 w-full hover:bg-slate-200'><FcPlus size={20}></FcPlus> Add a card</div>}
            </div>}

            {
                data && data.map(eachTask => <div
                    key={eachTask._id}
                    className={`bg-slate-50 w-full my-4 px-6 py-4 shadow-md rounded-md ${role === 'To Do' ? 'shadow-red-200' : ''} ${role === 'Doing' ? 'shadow-blue-200' : ''} ${role === 'Done' ? 'shadow-green-200' : ''}`}
                >
                    {(owner === user.email || mentioned) && <div className='flex justify-end gap-2'>
                        <div className='cursor-pointer' title='delete task' onClick={() => handleTaskDelete(eachTask._id)}><MdDelete size={20}></MdDelete></div>
                    </div>}
                    <div className=''>
                        <span className='font-bold inline-flex items-center'>
                            {(owner === user.email || mentioned) && <span className='cursor-pointer mr-1' onClick={() => handleModalPopUpForTitle(eachTask._id)}><GrEdit size={15}></GrEdit></span>}
                            Title:
                        </span>
                        <span className='text-slate-500 ml-1'>{eachTask.title}</span>
                    </div>
                    <div className=''>
                        <span className='font-bold inline-flex items-center'>
                            {(owner === user.email || mentioned) && <span className='cursor-pointer mr-1' onClick={() => handleModalPopUpForDescription(eachTask._id + 1)}><GrEdit size={15}></GrEdit></span>}
                            Description:
                        </span>
                        <span className='text-slate-500 ml-1'>{eachTask.description}</span>
                    </div>
                    {(owner === user.email || mentioned) && <div>
                        <div className='divider'></div>
                        <div className='mt-4 flex gap-3'>
                            {eachTask.role !== 'To Do' && <button onClick={() => makeRoleUpdate(eachTask._id, 'To Do')} className='bg-red-600 hover:bg-red-400 py-1 px-3 rounded-lg text-white font-semibold'>To Do</button>}
                            {eachTask.role !== 'Doing' && <button onClick={() => makeRoleUpdate(eachTask._id, 'Doing')} className='bg-blue-600 hover:bg-blue-400 py-1 px-3 rounded-lg text-white font-semibold'>Doing</button>}
                            {eachTask.role !== 'Done' && <button onClick={() => makeRoleUpdate(eachTask._id, 'Done')} className='bg-green-600 hover:bg-green-400 py-1 px-3 rounded-lg text-white font-semibold'>Done</button>}
                        </div>
                    </div>}


                    {/* modal body */}

                    <dialog id={eachTask._id} className="modal rounded-none text-black bg-slate-200 bg-opacity-40">
                        <div className=" w-[300px]">
                            <input defaultValue={eachTask.title} onBlur={e => setModalTitle(e.target.value)} name='updatedTitle' type="text" placeholder="Write Title" className="input mb-2 w-full" required /> <br />

                            <div className="modal-action grid grid-cols-2">
                                <form method="dialog">
                                    <button onClick={() => handleUpdateTaskDataTitle(eachTask._id)} className="btn bg-green-600 border-green-600 text-white hover:bg-green-500 w-full">Update</button>
                                </form>
                                <form method="dialog">
                                    <button className="btn bg-red-600 border-green-600 text-white hover:bg-green-500 w-full">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                    <dialog id={eachTask._id + 1} className="modal rounded-none text-black bg-slate-200 bg-opacity-40">
                        <div className=" w-[300px]">
                            <textarea defaultValue={eachTask.description} onBlur={e => setModalDescription(e.target.value)} name='updatedDescription' className="textarea w-full" placeholder="Write Description" required></textarea>

                            <div className="modal-action grid grid-cols-2">
                                <form method="dialog">
                                    <button onClick={() => handleUpdateTaskDataDescription(eachTask._id)} className="btn bg-green-600 border-green-600 text-white hover:bg-green-500 w-full">Update</button>
                                </form>
                                <form method="dialog">
                                    <button className="btn bg-red-600 border-green-600 text-white hover:bg-green-500 w-full">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div >)
            }
        </div >
    );
};

export default TaskBoard;