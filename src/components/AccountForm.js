import React, {useState} from "react";
import { registerUser } from "../api/api";
import { useParams } from "react-router-dom";


const AccountForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {action} = useParams();
    console.log('action', action);


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const {data} = await registerUser(username, password);
        } catch (error) {
            console.error(error)
        }

    };


    return (
        <form className="ui form" onSubmit={onSubmitHandler}>
            <h1>Sign up</h1>
            <div className="field">
                <label>Username</label>
                <input type="text" value={username} placeholder="username" required onChange={(event) => setUsername(event.target.value)}></input>
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" value={password} placeholder="password" minLength="8" required onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <button className="ui button" type="submit">Sign up</button>
        </form>
    )
}

export default AccountForm;