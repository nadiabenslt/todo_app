import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from "./../services/api";

export default function Modify() {
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [date,setDate]=useState('');

    const navigate=useNavigate();
    const {id}=useParams()
    useEffect(()=>{
        try{
            api.get(`/tasks/${id}`)
            .then(res=>{setTitle(res.data.task.title)
                setDesc(res.data.task.description)
                setDate(res.data.task.date)
            }
            )
        }catch(err){console.log(err);
        }
    },[id]
    )
    const change = async (e) =>{
        e.preventDefault()
        try{
            await api.put(`/tasks/modifiy/${id}`,{
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
      <p className="page-title">Edit Task</p>
      <p className="page-subtitle">Update the task details</p>

      <form onSubmit={change}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" />
        </div>
        <div className="field">
          <label htmlFor="date">Due Date</label>
          <input type="date" id="date" name="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}
