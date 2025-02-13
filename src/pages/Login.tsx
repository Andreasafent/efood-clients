import { useState } from "react";
import { useAuth } from "../context/AuthContext";


function Login(){
    const {user, token, login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = ()=>{
        login({email, password});
    }

    return (
        <div className="flex justify-center h-[200px] items-center">
            <form onSubmit={(ev)=>ev.preventDefault()} className="flex flex-col gap-3 w-[350px] p-4 rounded-lg ring-1 ring-gray-500">
                <h1>Login</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Email" 
                        value={email}
                        onChange={(ev)=>{
                            setEmail(ev.target.value);
                        }}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="password" 
                        className="grow" 
                        placeholder="Password"
                        value={password}
                        onChange={(ev)=>{
                            setPassword(ev.target.value);
                        }}
                    />
                </label>
                <button className="btn btn-primary" onClick={onLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;