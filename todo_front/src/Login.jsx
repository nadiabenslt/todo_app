import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Login() {
    const [email,setEmail]=useState('');
    const [err,setErr]=useState('')
    const [pwd,setPwd]=useState('')
    const navigate=useNavigate();
    const {login}=useContext(AuthContext)
    const add = async (e) =>{
        e.preventDefault();
        try{
            const res=await axios.post('http://127.0.0.1:8000/api/login',{
            email,password:pwd
        })
        console.log(res);
        login(res.data.user,res.data.token)
        navigate('/')
        }catch(err){
            setErr(err.response.data.message)
        }
        
    }
  return (
    <div className="card">
      <p className="page-title">Welcome back</p>
      <p className="page-subtitle">Sign in to your account</p>

      <form onSubmit={add}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={e=>setPwd(e.target.value)} placeholder="••••••••" />
        </div>
        <button type="submit">Sign In</button>
        <button type="button" className="btn-secondary">
          <Link to='/Register'>Create an account</Link>
        </button>
      </form>

      {err ? <p className="error-msg" style={{marginTop:'14px'}}>{err}</p> : null}
    </div>
  )
}
