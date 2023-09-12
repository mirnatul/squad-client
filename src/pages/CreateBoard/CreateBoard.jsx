import React, { useContext, useState } from 'react';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';
import { AuthContext } from '../../provider/AuthProvider';

import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CreateBoard = () => {

    const [mentioned, setMentioned] = useState('')


    const time = moment().format('Do MMMM YYYY');
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();


    const handleCreateBoard = e => {
        e.preventDefault();
        const form = e.target;
        const boardName = form.boardName.value;
        const companyName = form.companyName.value;
        const description = form.description.value;
        const visibility = form.visibility.value;

        const createdBoard = { boardName: boardName, companyName: companyName, description: description, visibility: visibility, owner: user.email, time: time, creator: user.displayName, mentioned: mentioned }
        // console.log(createdBoard);
        fetch('https://squad-server.vercel.app/boards', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(createdBoard)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    navigate('/my-board')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Board created successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div>
            <HeadingOfPage heading={"Create Board"}></HeadingOfPage>

            <form onSubmit={handleCreateBoard}>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    <div>
                        <div className='lg:flex lg:gap-4 w-full'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Enter your board name:</span>
                                </label>
                                <input name='boardName' type="text" placeholder="Board Name" className="input input-bordered w-full md:w-[255px] border-blue-500 border-2 py-6" />
                            </div>
                            <div className="form-control mt-2 lg:mt-0">
                                <label className="label">
                                    <span className="label-text font-semibold">Choose your company name:</span>
                                </label>
                                <input name='companyName' type="text" placeholder="Company Name" className="input input-bordered w-full md:w-[255px] border-blue-500 border-2 py-6" />
                            </div>
                        </div>
                        <div>
                            <textarea name='description' className="textarea textarea-bordered mt-6 w-full lg:max-w-[625px] min-h-[200px] border-blue-500 border-2" placeholder="Add a Description ( 300 letter max )" maxLength={300}></textarea>
                        </div>
                    </div>
                    <div className='md:ml-10 lg:mt-4'>
                        <p className='mb-2 mt-4 lg:mt-0 bg-red-600 text-white px-2 py-3 text-center rounded-lg'>Must give <span className='font-bold text-xl'>'A Space'</span> after every email. Example, <br />
                            <span className=''>www.abc@gmail.com www.xyz@gmail.com</span></p>
                        <textarea defaultValue={mentioned} onBlur={e => setMentioned(e.target.value)} name='mentioned' className="textarea textarea-bordered mt-2 w-full lg:max-w-[625px] min-h-[200px] border-red-500 border-2" placeholder="Give a space after every email"></textarea>
                    </div>
                </div>
                <div className='mt-4'>
                    <select name='visibility' className="select border-blue-600 border-2 w-full max-w-[150px] mr-6 font-semibold" required>
                        <option selected value='public'>Public</option>
                        <option value='private'>Private</option>
                    </select>
                    <input type="submit" value='Create Board' className='bg-blue-600 font-bold text-white py-3 px-4 rounded-md hover:bg-blue-500 cursor-pointer' />
                </div>
            </form>
        </div>
    );
};

export default CreateBoard;