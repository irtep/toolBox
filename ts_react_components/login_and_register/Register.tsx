    import React, { useContext, useRef, useState } from "react";
    import { Backdrop, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
    import { RigContext } from "../context/RigContext";

    const Register: React.FC = (): React.ReactElement => {
        const [msg, setMsg] = useState<string>('');
        const formRef = useRef<HTMLFormElement>();

        const {
            setMode
        } = useContext(RigContext);

        const registerUser = async (e: React.FormEvent): Promise<void> => {
            e.preventDefault();

            if (formRef.current?.username.value) {
                if (formRef.current?.password.value) {
                    if (formRef.current?.password.value === formRef.current?.password2.value) {
                        //const url: string = (modeOfUse === "dev") ?
                        const url = "http://localhost:5509/api/users" //:
                       // "/api/users";
                        const connection: Response = await fetch(url, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: formRef.current?.username.value,
                                password: formRef.current?.password.value,
                                auth: formRef.current?.auth.value
                            })
                        });

                        if (connection.status === 200) {
                            setMsg('Username is now registered. You can now login');
                            setTimeout(() => {
                                setMsg('')
                                setMode("/login");
                            }, 5000);


                        } else if (connection.status === 400) {
                            setMsg('This username is already registered');
                            setTimeout(() => { setMsg('') }, 10000);
                        }

                        else if (connection.status === 403) {
                            setMsg('No permission. Ask permission from the admin');
                            setTimeout(() => { setMsg('') }, 10000);
                        }

                    } else {
                        setMsg('Passwords are not identical.');
                        setTimeout(() => { setMsg('') }, 10000);
                    }
                }
            }
        };

        return (
            <Backdrop open={true}>
                <Paper sx={{ padding: 2 }}>
                    <Box
                        component="form"
                        onSubmit={registerUser}
                        ref={formRef}
                        style={{
                            width: 300,
                            backgroundColor: "#fff",
                            padding: 20
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">Register new username</Typography>
                            <TextField
                                label="Username"
                                name="username"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <TextField
                                label="Repeat password"
                                name="password2"
                                type="password"
                            />
                            <TextField
                                label="Authorization code"
                                name="auth"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                Register
                            </Button>

                        </Stack>

                        <Button onClick={() => { setMode("main"); }}>Cancel</Button>

                        <Typography sx={{ marginTop: 10 }}>{msg}</Typography>

                    </Box>
                </Paper>
            </Backdrop>
        );
    };

    export default Register;