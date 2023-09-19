import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const SignInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { currentUser, logout, login } = useAuth()
    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <h1>{currentUser?.email }</h1>
            <form className="card" onSubmit={handleLoginSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <button type={"submit"}>Login</button>
            </form>{/*
            <form className="card" onSubmit={handleRegisterationSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <button type={"submit"}>Register</button>
            </form>*/}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default SignInPage