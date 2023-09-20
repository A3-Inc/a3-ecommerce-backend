import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Axios from 'axios'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Grid, IconButton, TextField } from "@mui/material";
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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
            />
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="fixed" color="primary" sx={{ borderRadius: 4, flexGrow: 1, height: "7%", display: 'flex', flexDirection: 'row' }}>
                    <IconButton aria-label="back" onClick={goBack} edge="start" color="inherit" sx={{
                        width: "5%", marginTop: "0.5%"
                    }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{

                        flexGrow: 1, display: "flex", flexDirection:
                            "column", justifyContent: "center", fontWeight: "bold", fontFamily: "monospace  ", textAlign: "left", marginleft: "7%", marginTop: "0.5%"
                    }} color="secondary">


                        Register

                    </Typography>

                </AppBar>
            </Box >
            <div>

                <form className="card" onSubmit={handleSubmit} >
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <TextField type={"text"} label="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} /><br />
                        </Grid>
                        <Grid item>
                            <TextField type={"text"} label="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} /><br />
                        </Grid>
                        <Grid item >
                            <TextField type={"email"} label="E-mail ID" value={email} onChange={handleEmailChange} /><br />
                        </Grid>
                        <Grid item>
                            <TextField type={"password"} label="Password" value={password} onChange={handlePasswordChange} /><br />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" type={"submit"}>Register</Button>
                        </Grid>
                    </Grid>
                </form>
            </div >
        </>
    )

}

export default SignUpPage