import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import Logout from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {

        authService.logout().then(() => { dispatch(logout()) })
    }

    return (
        <button
            onClick={logoutHandler}
            className=" px-5 py-2.5 rounded-xl  bg-indigo-600  text-white font-medium  hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg">
            Logout
        </button>
    )
}

export default LogoutBtn
