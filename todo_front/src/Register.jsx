import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";

export default function Register() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [pwd,setPwd]=useState('');
    const navigate=useNavigate();

    const add = async (e)=>{
        e.preventDefault();
        try{
            const res= await api.post("/register",{
                name,email,password:pwd
            })
            console.log(res);
            localStorage.setItem('token',res.data.token)
            navigate("/")
        }catch(err){
            console.log(err)
            }
            
        }
        
  return (
    <div className="card">
      <p className="page-title">Create account</p>
      <p className="page-subtitle">Join us — it's free</p>

      <form onSubmit={add}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={e=>setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={e=>setPwd(e.target.value)} placeholder="••••••••" />
        </div>
        <button type="submit">Register</button>
        <button type="button" className="btn-secondary">
          <Link to='/Login'>Already have an account?</Link>
        </button>
      </form>
    </div>
  )
}
