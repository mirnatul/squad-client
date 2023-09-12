import React from 'react';
import HeadingOfPage from '../../components/HeadingOfPage/HeadingOfPage';
import { FaHandPointRight } from 'react-icons/fa'
import './Help.css'

const Help = () => {
    return (
        <div className='help text-slate-700 pb-6'>
            <HeadingOfPage heading={"Help"}></HeadingOfPage>
            <div className='max-w-[850px] text-md md:text-lg mx-auto md:border-l-8 pl-4'>
                <p className='mb-4'>First You have to login/register. Because all your data will be stored by your email.</p>
                <div>
                    <h2 className='font-bold text-xl text-blue-500 my-2'>Create Board:</h2>
                    <table className='lg:ml-4 max-w-[700px]'>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Create Board button with take you to the create a board form. Here you can add board name, company name and description.</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Public/Private options: Public board will be shown in 'all board' section, which will be read-only. And private board will be only shown in 'My Board' section.</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Red box: Here you can mention by giving the email address of persons, which will be shown on the 'Mentioned' section and also give them access to change board data and task data. But they can mention or remove any email. Only the board creator will be able to update the red box.</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Then just press 'Create Board' button to create the board.</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h2 className='font-bold text-xl text-blue-500 my-2'>My Board and Mentioned:</h2>
                    <table className='lg:ml-4 max-w-[700px]'>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>In <span className='text-green-500 font-bold'>'My Board'</span> you will see all the board that you are created (public/private).</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>In <span className='text-green-500 font-bold'>'Mentioned'</span> you will see all the board that are someone else created but mentioned your email in the red box that was explained in the create board section.</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Boards from My Board and Mentioned section have three dot in the right corner that give you access to edit or delete the entire board.</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h2 className='font-bold text-xl text-blue-500 my-2'>All Board:</h2>
                    <table className='lg:ml-4 max-w-[700px]'>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td>Here you find all the board that are set to 'public' when created. You do not have access to edit or delete a board here.</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h2 className='font-bold text-xl text-blue-500 my-2'>Tasks:</h2>
                    <table className='lg:ml-4 max-w-[700px]'>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td><span className='text-green-500 font-bold'>Task in My Board and Mentioned</span>: By clicking the name of the board it takes you to the task management section where you find To Do, Doing and Dome options. Every section have 'Add a Card' option to add the task title and description. Each task contains title and description editable option and whole task delete option. Each task also have role shifting option. For example: To Do to Doing, Done to To Do etc.</td>
                        </tr>
                        <tr>
                            <td className='flex mr-2 pt-1'><FaHandPointRight></FaHandPointRight></td>
                            <td><span className='text-green-500 font-bold'>Task in All Board</span>: Here the task are read-only. You can not do any kind of operations like update, delete, role change etc.</td>
                        </tr>
                    </table>
                </div>
                <div className='my-4 text-lg md:text-xl font-bold text-blue-500'>Hope you will have a great experience with the web application</div>
            </div>
        </div>
    );
};

export default Help;