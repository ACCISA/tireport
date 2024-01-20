import { useSignIn } from "react-auth-kit"
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Register(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (ev) => {
        ev.preventDefault();
        try{
            axios.post('/register',{
                email: username,
                password: password,
            })
            .then(res => {
                console.log(res)
            })
            alert('Registration Successful')
        } catch (e) {
            alert('Email already used.')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
        <Card className="bg-vm-info-color-500 border-white shadow-white shadow-md">
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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
            <Button type="submit" className="border-white">Submit</Button>
            </form>
        </Card>
    </div>
    )
}