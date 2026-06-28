import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "./../services/api"

export default function Home() {
    const [tasks,setTasks]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        api.get("/tasks").then(res=>{
        setTasks(res.data.tasks);}) 
        .catch((err) => console.log(err.response?.data))
    },[])
    const logout= (e)=>{
        e.preventDefault();
        localStorage.clear();
            api.post('/logout')
            
            navigate('/Login')
    }
    // axios.get('http://127.0.0.1:8000/api/tasks')
    // .then(res=>setTasks(res.data))
  return (
    <>
    <h2>my tasks:</h2>
    {
        tasks.length<=0?<p>no task exists</p>:
        tasks.map((task,i)=>{
            return <ul key={i}>
                <li>{task.title}</li>
                <li>{task.description}</li>
                <li>{task.date}</li>
            </ul>
        })
    }
    <button><Link to="/Form" >add task</Link></button>
    <form onSubmit={logout}><button type="submit" >log out</button></form>
    
    </>
  )
}
