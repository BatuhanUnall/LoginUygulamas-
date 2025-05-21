import React, { useContext, useState } from 'react';
import { Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SetIsLoggedInContext } from '../App';

export const Login = () => {
    const setIsLoggedIn = useContext(SetIsLoggedInContext);
    const heading = { fontSize: "2.5rem", fontWeight: "600" }
    const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" }
    const row = { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem", width: '200px', height: '50px' }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log('Email:', email);
        // console.log('Password:', password);
        axios.post("http://localhost:3001/login", { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") {
                    axios.get("http://localhost:3001/user", { withCredentials: true }).then(response => {
                        if (response.data.user) {
                            setIsLoggedIn(true);
                            navigate("/home", { state: { user: response.data.user } });
                        }
                    });
                }
                else {
                    alert("login failed : User does not exists");
                }
            }).catch(err => console.log(err))

    }

    const test = () => {





    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Paper sx={{
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "10px 10px 10px",
                    textAlign: "center"
                }}>
                    <Typography style={heading}>Login</Typography>
                    <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
                        <TextField onChange={(e) => {
                            setEmail(e.target.value)
                            console.log(e.target.value)
                        }} name="email" sx={{ width: "100%", marginBottom: "1rem" }} label="Enter Email" type='email' variant='outlined'></TextField>
                        <TextField onChange={(e) => {
                            setPassword(e.target.value)
                            console.log(e.target.value)
                        }} name="password" sx={{ width: "100%", marginBottom: "1rem" }} label="Enter Password" type='password' variant='outlined'></TextField>
                        <Button type='submit' variant='contained' sx={btnStyle}>Login</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;
