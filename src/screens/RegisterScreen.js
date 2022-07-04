import { useState, useContext } from "react";
import AuthContext, { authContext } from "../contexts/Auth";
import { globalContext } from "../contexts/Globals";
function RegisterScreen() {
    const Auth = useContext(authContext)
    const Global = useContext(globalContext)
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const handleRegister = async(e)=>{
        e.preventDefault();
        if(!username || !email || !password){
            Global.showAlert({text:'all of the fields are required', type:'error'})
            return;
        }
        try {
            let res = await fetch('https://18b8-51-81-154-37.ngrok.io/auth/register',
            {
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({username,email,password})
        })
        if(res.status!=200){
            res.json().then(res2=>Global.showAlert({text:res2.error,type:'success'}))
        }
        res.json().then(res2=>{
            Auth.setTokenHandle(res2.token);
            Auth.toggleIsAuthenticated();
        })
        } catch (error) {
            console.error(error)
        }
    }

    return ( <>
    <div>
        <form className="flex justify-center items-center flex-col">
            <input type="text" className="border-2 border-gray-400 my-2 p-1 text-2xl" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" className="border-2 border-gray-400 my-2 p-1 text-2xl" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="border-2 border-gray-400 my-2 p-1 text-2xl" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="bg-red-500 p-2 text-lg text-white rounded-sm mr-4 hover:bg-red-600 transition-colors no-underline mt-2" onClick={(e)=>handleRegister(e)}>Register</button>
        </form>
    </div>
    </> );
}

export default RegisterScreen;