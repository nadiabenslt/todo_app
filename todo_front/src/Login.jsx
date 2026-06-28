import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email,setEmail]=useState('');
    const [err,setErr]=useState('')
    const [pwd,setPwd]=useState('')
    const navigate=useNavigate();
    const add = async (e) =>{
        e.preventDefault();
        try{
            const res=await axios.post('http://127.0.0.1:8000/api/login',{
            email,password:pwd
        })
        console.log(res);
        
        localStorage.setItem('token',res.data.token)
        navigate('/')
        }catch(err){
            setErr(err.response.data.message)
        }
        
    }
  return <>

    <form onSubmit={add}>
        <label htmlFor="email">email:</label>
        <input type="email" name="email" onChange={e=>setEmail(e.target.value)} placeholder="email" /><br />
        <label htmlFor="password">password:</label>
        <input type="password" name="password" onChange={e=>setPwd(e.target.value)} placeholder="password" /><br />
        <button type="submit">Login</button>
        <button type="submit"> <Link to='/Register'  >register</Link></button>
    </form>
    {err?<p>{err}</p>:<p></p>}

  </>
}
