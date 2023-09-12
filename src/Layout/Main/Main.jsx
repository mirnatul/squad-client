import React, { useContext, useState } from "react";
import { FaPlus, FaBorderAll, FaUserAlt, FaUserSecret, FaUserCheck } from 'react-icons/fa'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { IoMdHelp } from 'react-icons/io'
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri'

import lightThemeLogo from '../../assets/logo/light-logo.png'
import { AuthContext } from "../../provider/AuthProvider";

import { Link, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2';
import unknown from '../../assets/unknown.png'


const SideBar = () => {

    const { user, logOut } = useContext(AuthContext)


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your have been logged Out successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => console.log(err))
    }

    const [open, setOpen] = useState(true);

    return (
        <div className="flex text-black">
            <div className={`${open ? "w-72" : "w-[85px] "} h-screen p-5  pt-8 absolute bg-slate-800 text-white z-10 lg:relative duration-300`}>
                <HiArrowNarrowLeft onClick={() => setOpen(!open)} className={`absolute cursor-pointer right-5 top-9 w-7 border-dark-purple ${!open && "rotate-180"}`} size={32}></HiArrowNarrowLeft>
                <div className="flex gap-x-4 items-center">
                    <div className={`w-[100px] ${!open && "scale-0"}`}>
                        <img src={lightThemeLogo} className={`cursor-pointer duration-500 w-full`} />
                    </div>
                </div>
                <ul className="pt-6">
                    <Link to='/create-board' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold`}>
                        <FaPlus size={20}></FaPlus>
                        <span className={`${!open && "hidden"}`}>Create Board</span>
                    </Link>
                    <Link to='/my-board' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <FaUserAlt size={20}></FaUserAlt>
                        <span className={`${!open && "hidden"}`}>My Board</span>
                    </Link>
                    <Link to='/mentioned' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <FaUserCheck size={22}></FaUserCheck>
                        <span className={`${!open && "hidden"}`}>Mentioned Board</span>
                    </Link>
                    <Link to='/' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <FaBorderAll size={20}></FaBorderAll>
                        <span className={`${!open && "hidden"}`}>All Board</span>
                    </Link>
                    <Link to='/help' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <IoMdHelp size={22}></IoMdHelp>
                        <span className={`${!open && "hidden"}`}>Help</span>
                    </Link>
                    <Link to='project-creator' className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <FaUserSecret size={22}></FaUserSecret>
                        <span className={`${!open && "hidden"}`}>Project Creator</span>
                    </Link>
                    {user ? <li onClick={handleLogOut} className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                        <RiLogoutBoxLine size={22}></RiLogoutBoxLine>
                        <span className={`${!open && "hidden"}`}>Log Out</span>
                    </li> :
                        <Link to='/login'>
                            <li className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 hover:bg-slate-300 font-semibold`}>
                                <RiLoginBoxLine size={22}></RiLoginBoxLine>
                                <span className={`${!open && "hidden"}`}>Login</span>
                            </li>
                        </Link>
                    }
                    {user && <li className={`flex rounded-md p-3 py-4 cursor-pointer items-center gap-x-4 mt-3 font-semibold ${!open && 'justify-center'}`}>
                        <div className="avatar mt-">
                            <div className="w-8 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL ? user.photoURL : unknown} />
                            </div>
                        </div>
                        <span className={`${!open && "hidden"}`}>{user?.displayName}</span>
                    </li>}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7 lg:ml-0 ml-16">
                {/* TODO: all page work */}
                <Outlet></Outlet>
            </div>
        </div >
    );
};
export default SideBar;