import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "./../services/api";

export default function Form() {
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [date,setDate]=useState('');
    const navigate=useNavigate();
    const add = async (e) =>{
        e.preventDefault()
        try{
            await api.post('/tasks',{
                title,description:desc,date
            }
        )
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="card">
      <p className="page-title">New Task</p>
      <p className="page-subtitle">Fill in the details below</p>

      <form onSubmit={add}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" onChange={e=>setTitle(e.target.value)} placeholder="Task title" />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" onChange={e=>setDesc(e.target.value)} placeholder="Short description" />
        </div>
        <div className="field">
          <label htmlFor="date">Due Date</label>
          <input type="date" id="date" name="date" onChange={e=>setDate(e.target.value)} />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}
