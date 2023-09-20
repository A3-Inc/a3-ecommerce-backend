import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Axios from 'axios'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Button, Grid, IconButton, TextField, Toolbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const val = "Line1\nLine2";
    const { currentUser, logout, register } = useAuth()
    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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
        <>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="sticky" color="primary" >
                    <Toolbar>
                        <IconButton aria-label="back" onClick={goBack} edge="start" color="inherit" >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" fontFamily={"monospace"} >
                            Register
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box >
            <form onSubmit={handleSubmit} >
                <Grid container direction={"column"} spacing={2} sx={{ m: 2 }}>
                    <Grid item>
                        <TextField type={"text"} label="First Name" required value={firstName} onChange={(e) => setfirstName(e.target.value)} /><br />
                    </Grid>
                    <Grid item>
                        <TextField type={"text"} label="Last Name" required value={lastName} onChange={(e) => setlastName(e.target.value)} /><br />
                    </Grid>
                    <Grid item >
                        <TextField type={"email"} label="E-mail ID" required value={email} onChange={handleEmailChange} /><br />
                    </Grid>
                    <Grid item>
                        <TextField type={"password"} label="Password" value={password} onChange={handlePasswordChange} /><br />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" type={"submit"}>Register</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )

}

export default SignUpPage