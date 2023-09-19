import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useAuth} from "./context/AuthContext.jsx";
import {Link} from "react-router-dom";



function App() {




    const handleRegisterationSubmit = async (e) => {
        e.preventDefault()
        await register(email, password);
    }


    const { currentUser, logout, login, register } = useAuth()

    return (
        <>
            <div>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
            </div>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
                <h1>{currentUser?.email}</h1>
            </div>
        </>
    )
}

export default App
