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
    <>
    <h2>add task:</h2>
    <form onSubmit={add}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" onChange={e=>setTitle(e.target.value)} /><br />
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" onChange={e=>setDesc(e.target.value)} /><br />
        <label htmlFor="date">Date:</label>
        <input type="date" name="date" onChange={e=>setDate(e.target.value)} /><br />
        <button type="submit">Add</button>
    </form>
    </>
  )
}
