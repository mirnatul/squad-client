import React, { useContext, useEffect, useState } from 'react';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';
import { AuthContext } from '../../provider/AuthProvider';

import moment from 'moment';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const UpdateBoard = () => {
    const [boardData, setBoardData] = useState([])

    const time = moment().format('Do MMMM YYYY');
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id);
    useEffect(() => {
        fetch(`https://squad-server.vercel.app/boards/${id}`)
            .then(res => res.json())
            .then(data => setBoardData(data))
    }, [])

    const handleUpdateBoard = e => {
        e.preventDefault();
        const form = e.target;
        const boardName = form.boardName.value;
        const companyName = form.companyName.value;
        const description = form.description.value;
        const visibility = form.visibility.value;
        const mentioned = form?.mentioned?.value || boardData.mentioned;


        const updatedBoard = { boardName: boardName, companyName: companyName, description: description, visibility: visibility, owner: boardData.owner, time: time, creator: user.displayName, mentioned: mentioned }

        fetch(`https://squad-server.vercel.app/boards/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedBoard)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    navigate('/')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Board data updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    return (
        <div>
            <HeadingOfPage heading={"Update Board"}></HeadingOfPage>
            <form onSubmit={handleUpdateBoard}>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    <div>
                        <div className='lg:flex lg:gap-4 w-full'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Update your board name:</span>
                                </label>
                                <input defaultValue={boardData.boardName} name='boardName' type="text" placeholder="Board Name" className="input input-bordered w-full md:w-[255px] border-blue-500 border-2 py-6" />
                            </div>
                            <div className="form-control mt-2 lg:mt-0">
                                <label className="label">
                                    <span className="label-text font-semibold">Update your company name:</span>
                                </label>
                                <input defaultValue={boardData.companyName} name='companyName' type="text" placeholder="Company Name" className="input input-bordered w-full md:w-[255px] border-blue-500 border-2 py-6" />
                            </div>
                        </div>
                        <div>
                            <textarea defaultValue={boardData.description} name='description' className="textarea textarea-bordered mt-6 w-full lg:max-w-[625px] min-h-[200px] border-blue-500 border-2" placeholder="Update a Description ( 300 letter max )" maxLength={300}></textarea>
                        </div>
                    </div>
                    {
                        (boardData.owner === user.email) && <div className='md:ml-10 lg:mt-4'>
                            <p className='mb-2 mt-4 lg:mt-0 bg-red-600 text-white px-2 py-3 text-center rounded-lg'>Must give <span className='font-bold text-xl'>'A Space'</span> after every email. Example, <br />
                                <span className=''>www.abc@gmail.com www.xyz@gmail.com</span></p>
                            <textarea defaultValue={boardData.mentioned} name='mentioned' className="textarea textarea-bordered mt-2 w-full lg:max-w-[625px] min-h-[200px] border-red-500 border-2" placeholder="Give a space after every email"></textarea>
                        </div>
                    }
                </div>
                <div className='mt-4'>
                    <select name='visibility' className="select border-blue-600 border-2 w-full max-w-[150px] mr-6 font-semibold" required>
                        <option selected={boardData.visibility === 'public' ? true : false} value='public'>Public</option>
                        <option selected={boardData.visibility === 'private' ? true : false} value='private'>Private</option>
                    </select>
                    <input type="submit" value='Update Board' className='bg-blue-600 font-bold text-white py-3 px-4 rounded-md hover:bg-blue-500 cursor-pointer' />
                </div>
            </form>
        </div>
    );
};

export default UpdateBoard;