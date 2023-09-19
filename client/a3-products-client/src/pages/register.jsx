import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        await register(email, password)
    }

    return (
        <div>
            <h1>Sign Up Page</h1>
            <h1>{currentUser?.email }</h1>
            <form className="card" onSubmit={handleSubmit}>
                <input type={"email"} value={email} onChange={handleEmailChange} />
                <input type={"password"} value={password} onChange={handlePasswordChange} />
                <button type={"submit"}>Register</button>
            </form>
        </div>
    )
}

export default SignUpPage