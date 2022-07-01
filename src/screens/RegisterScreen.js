import { useState, useContext } from "react";
import AuthContext, { authContext } from "../contexts/Auth";
function RegisterScreen() {
    const Auth = useContext(authContext)
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[isError,setIsError] = useState(false);
    const[errorText,setErrorText] = useState('');
    const[authenticated, setAuthenticated] = useState(false)
    const handleRegister = async(e)=>{
        e.preventDefault();
        console.log(Auth);
        // if(!username || !email || !password){
        //     showAlert('all of the fields are required')
        //     return;
        // }
        // console.log('data is valid');
        // try {
        //     let res = await fetch('http://localhost:8080/auth/register',
        //     {
        //         method:'POST',
        //         headers:{'content-type':'application/json'},
        //         body:JSON.stringify({username,email,password})
        // })
        // if(res.status!=200){
        //     res.json().then(res2=>showAlert(res2.error))
        // }
        // res.json().then(res2=>console.log(res2.token))
        // } catch (error) {
        //     console.error(error)
        // }
    }
    function showAlert(text){
        setIsError(true);
        setErrorText(text);
        setTimeout(()=>{
            setIsError(false);
            setErrorText('');
        },3000)
    }

    return ( <>
    <div>
        {isError?<div class="py-3 px-5 mb-4 bg-red-100 text-red-900 text-base rounded-md border border-red-200" role="alert">
            {errorText}
        </div>:<span></span>}
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