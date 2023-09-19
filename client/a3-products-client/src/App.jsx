import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useAuth} from "./AuthContext.jsx";

function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { currentUser, logout, login, register } = useAuth()

    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
``
    const handleRegisterationSubmit = async (e) => {
        e.preventDefault()
        await register(email, password);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>{currentUser?.email }</h1>
            <form className="card" onSubmit={handleLoginSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <button type={"submit"}>Login</button>
            </form>
            <form className="card" onSubmit={handleRegisterationSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <button type={"submit"}>Register</button>
            </form>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default App
