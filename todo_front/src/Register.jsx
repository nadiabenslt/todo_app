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
    <>
    <form onSubmit={add}>
<label htmlFor="name">name:</label>
<input type="text" name="name" onChange={e=>setName(e.target.value)} placeholder="name" /><br />
<label htmlFor="email">email:</label>
<input type="email" name="email" onChange={e=>setEmail(e.target.value)} placeholder="email" /><br />
<label htmlFor="password">password:</label>
<input type="password" name="password" onChange={e=>setPwd(e.target.value)} placeholder="password" /><br />
<button type="submit">register</button>
<button type="submit"> <Link to='/Login'>Login</Link></button>

    </form>
    </>

  )
}
