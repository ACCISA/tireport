import { useSignIn } from "react-auth-kit"
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Login(){

    const signIn = useSignIn();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const handleLogin = (ev) => {
        ev.preventDefault();
        axios.post("/login", {
            "email": username,
            "password": password
        },
        {
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (res.status == 200){
                signIn({
                    token: res.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { 
                        email: res.data.email,
                        id: res.data._id,
                    },
                });
                setRedirect(true)
                return;
            }
            setInvalid(true);
        })
        .catch(res => {
            setInvalid(true);
        });
    }

    if (redirect) {
        return <Navigate to={"/"}/>
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Card className="bg-vm-info-color-500 border-white shadow-white shadow-md">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                    </div>
                    <TextInput id="email1" value={username} type="text" onChange={ev => setUsername(ev.target.value)} placeholder="Username" required />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password1" value="Password" />
                    </div>
                    <TextInput id="password1" value={password} type="password" onChange={ev => setPassword(ev.target.value)} required />
                </div>
                {invalid && <div className="text-red-600 font-bold">Invalid Credentials</div>}
                <Button type="submit" className="border-white">Submit</Button>
                </form>
            </Card>
        </div>
    )
}
