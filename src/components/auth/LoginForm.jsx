import {useState} from "react";
import {useNavigate} from "react-router-dom";
import users from "../../data/users";
import {useUserContext} from "../../context/UserProvider";
import "../../styles/login.css";

export default function LoginForm(){

    const navigate=useNavigate();
    const {login}=useUserContext();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    function handleLogin(e){

        e.preventDefault();

        const foundUser=users.find(
            user=>user.username===username && user.password===password
        );
        if(!foundUser){
            setError("Invalid Credentials");
            return;
        }
        login(foundUser);
        navigate(`/${foundUser.role}`);
    }

    return(
        <form onSubmit={handleLogin} className="login-card">
            <h1 className="text-3xl font-bold text-center text-zinc-800">
                Login
            </h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="login-input"
            />
            {
                error &&
                <p className="text-red-500">
                    {error}
                </p>
            }
            <button className="login-btn">
                Login
            </button>
            <div className="text-sm text-gray-500">
                student / 123
                <br/>
                teacher / 123
                <br/>
                admin / 123
            </div>
        </form>
    )
}