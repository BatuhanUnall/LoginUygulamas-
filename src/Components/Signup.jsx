import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Signup = () => {
    const heading = { fontSize: "2.5rem", fontWeight: "600" }
    const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px", }
    const row = { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }
    const btnStyle = { marginTop: "2.5rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem", width: '200px', height: '50px' }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = (e) => {

        e.preventDefault();
        axios.post("http://localhost:3001/signup", { name, email, password }).then(result => {
            if (result.status == 201) {
                console.log("User created successfully");
                navigate("/login");
            }
        })
            .catch(err => {
                if (err.response && err.respons.status === 400) {
                    window.alert("Email already exists.Please use a different email")
                } else {
                    console.log(err);
                }
            })
    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Paper sx={{
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: "10px 10px 10px",
                        textAlign: "center",

                    }}>
                        <Typography style={heading}>Signup</Typography>
                        <form onSubmit={handleSignup} style={{ marginTop: "2rem" }}>
                            <TextField onChange={(e) => setName(e.target.value)} name="name" required sx={{ width: "100%", marginBottom: "1rem" }} label="Enter Name" type='text' variant='outlined' />
                            <TextField onChange={(e) => setEmail(e.target.value)} name="email" required sx={{ width: "100%", marginBottom: "1rem" }} label="Enter Email" type='email' variant='outlined' />
                            <TextField onChange={(e) => setPassword(e.target.value)} name="password" required sx={{ width: "100%", marginBottom: "1rem" }} label="Enter Password" type='password' variant='outlined' />
                            <Button type='submit' variant='contained' sx={btnStyle}>Sign Up!</Button>
                        </form>

                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Signup; 