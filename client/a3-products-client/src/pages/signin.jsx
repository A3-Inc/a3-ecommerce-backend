import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Card, Grid, IconButton, TextField, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" color="primary">
                    <Toolbar>
                        <IconButton aria-label="back" onClick={goBack} edge="start" color="inherit">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" fontFamily={"monospace"}>
                            Login
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <center>
                {currentUser && <p>Logged in as: {currentUser.email}</p>}
                <br /> {currentUser && <Button variant='contained' onClick={logout}>Logout</Button>}
                <div className="card" style={{ width: "30rem", marginTop: "5rem" }}>
                    <Card variant="outlined" sx={{ minWidth: 275}}>
                        <form className="card" onSubmit={handleLoginSubmit}>
                            <Grid container spacing={2} sx={{mt:2, mb:2}}>
                                <Grid item xs={12}>
                                    <TextField type="email" className="form-control" placeholder="Email" onChange={handleEmailChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' type="submit" onChange={handleEmailChange}>Sign In</Button><br />
                                    <p>New to the site?</p>
                                    <p>Need to Register? <a href="/register">here</a></p>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </div>
            </center>
        </>
    )
}

export default SignInPage