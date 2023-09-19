import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Axios from 'axios'

const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const { currentUser, logout, register } = useAuth()
    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("http://127.0.0.1:8000/register", {
            first_name: firstName,
            last_name: lastName
        })

        await register(email, password)
    }

    return (
        <div>
            <h1>Sign Up Page</h1>
            <h1>{currentUser?.email}</h1>
            <form className="card" onSubmit={handleSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <input type={"text"} value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                <input type={"text"} value={lastName} onChange={(e) => setlastName(e.target.value)} />
                <button type={"submit"}>Register</button>
            </form>
        </div>
    )
}

export default SignUpPage