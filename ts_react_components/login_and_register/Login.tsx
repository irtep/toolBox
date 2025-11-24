import React, { useContext, useRef, useState } from "react";
import { Backdrop, Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import { RigContext } from "../context/RigContext";

interface DetailsOfUser {
    token: string,
    username: string,
    admin: boolean,
    testAccount: boolean
}

const Login: React.FC = () : React.ReactElement => {
    const [msg, setMsg] = useState<string>('');

    const {
        setToken,
        setUsername,
        setAdmin,
        setMode
      } = useContext(RigContext);

    const formRef = useRef<HTMLFormElement>();

    const logIn = async (e : React.FormEvent) : Promise<void> => {
        
        e.preventDefault();

        if (formRef.current?.username.value) {
            
            if (formRef.current?.password.value) {
               // const url: string = (modeOfUse === "dev") ?
                   const url = "http://localhost:5509/api/auth/login" //:
                 //   "/api/auth/login";
                const connection = await fetch(url, {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        username : formRef.current?.username.value,
                        password : formRef.current?.password.value
                    })
                });

                if (connection.status === 200) {

                    //let {token} = await connection.json();
                    let response = await connection.json();
                    console.log('resp: ', response);

                    setToken(response.token);
                    setUsername(formRef.current?.username.value);
                    setAdmin(response.admin);

                    const userDetails: DetailsOfUser = {
                        token: response.token,
                        username: formRef.current?.username.value,
                        admin: response.admin,
                        testAccount: response.testAccount
                    }

                    localStorage.setItem("uDetails", JSON.stringify(userDetails));
                    setMode("main");

                } else if (connection.status === 401) {
                    setMsg('incorrect password or username');
                    setTimeout( () => { setMsg('')}, 10000);
                } else {
                    setMsg(`check if server is online: ${connection.status}`);
                    setTimeout( () => { setMsg('')}, 10000);                    
                }
            } 
        } 
    };

    return (
            <Backdrop open={true}>
                <Paper sx={{padding : 2}}>
                    <Box
                        component="form"
                        onSubmit={logIn}
                        ref={formRef}
                        style={{
                            width: 300,
                            backgroundColor : "#fff",
                            padding : 20
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">Kirjaudu sisään</Typography>
                            <TextField 
                                label="Username" 
                                name="username"
                            />
                            <TextField 
                                label="Password"
                                name="password"
                                type="password" 
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large"
                            >
                                Log in
                            </Button>

                        </Stack>

                          <Button onClick= { () => { setMode("main"); }}>Cancel</Button>
                        
                        <Typography sx={{marginTop: 10}}>{msg}</Typography>

                    </Box>
                </Paper>
            </Backdrop>
    );
};

export default Login;