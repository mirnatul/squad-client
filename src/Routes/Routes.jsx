// react router dom
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AllBoard from "../pages/AllBoard/AllBoard";
import CreateBoard from "../pages/CreateBoard/CreateBoard";
import Help from "../pages/Help/Help";
import Mentioned from "../pages/Mentioned/Mentioned";
import MyBoard from "../pages/MyBoard/MyBoard";
import ProjectCreator from "../pages/ProjectCreator/ProjectCreator";
import SignUp from "../pages/SignUp/SignUp";
import TodoDoingDone from "../pages/TodoDoingDone/TodoDoingDone";
import UpdateBoard from "../pages/UpdateBoard/UpdateBoard";
import Login from './../pages/Login/Login';
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <AllBoard></AllBoard>
            },
            {
                path: 'create-board',
                element: <PrivateRoute><CreateBoard></CreateBoard></PrivateRoute>
            },
            {
                path: 'update-board/:id',
                element: <PrivateRoute><UpdateBoard></UpdateBoard></PrivateRoute>,
                loader: ({ params }) => fetch(`https://squad-server.vercel.app/boards/${params.id}`)
            },
            {
                path: 'my-board',
                element: <PrivateRoute><MyBoard></MyBoard></PrivateRoute>
            },
            {
                path: 'mentioned',
                element: <PrivateRoute><Mentioned></Mentioned></PrivateRoute>
            },
            {
                path: 'help',
                element: <Help></Help>
            },
            {
                path: 'project-creator',
                element: <ProjectCreator></ProjectCreator>
            },
            {
                path: 'todo-doing-done/:id',
                element: <PrivateRoute><TodoDoingDone></TodoDoingDone></PrivateRoute>,
                loader: ({ params }) => fetch(`https://squad-server.vercel.app/boards/${params.id}`)
            }
        ]
    },
    {
        path: 'signup',
        element: <SignUp></SignUp>
    },
    {
        path: 'login',
        element: <Login></Login>
    }
]);
