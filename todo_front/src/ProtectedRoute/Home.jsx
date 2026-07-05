import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "./../services/api"
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [statut, setStatut] = useState('all')
    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext)

    useEffect(() => {
        const params = {};
        if (statut && statut !== 'all') params.statut = statut;
        if (search) params.search = search;
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        api.get("/tasks", { params })
            .then(res => {
                setTasks(res.data.tasks);
            })
            .catch((err) => console.log(err.response?.data))
    }, [statut, search, startDate, endDate])

    const log_out = async (e) => {
        e.preventDefault();
        await api.post('/logout')
        logout()
        navigate('/Login')
    }

    const removeTask = async (id) => {
        try {
            await api.delete(`/tasks/remove/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    const updateTaskStatus = async (id, newStatut) => {
        try {
            await api.put(`/tasks/${id}/statut`, { statut: newStatut });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, statut: newStatut } : task
                )
            );
        } catch (err) {
            console.log(err);
        }
    }

    const clearFilters = () => {
        setStatut('all');
        setSearch('');
        setStartDate('');
        setEndDate('');
    }

    const getStatusClass = (status) => {
        if (status === 'done') return 'badge-done';
        if (status === 'In Progress') return 'badge-progress';
        return 'badge-todo';
    }

    return (
        <div className="home-wrapper">
            <div className="home-header">
                <h2 style={{ margin: 0 }}>My Tasks</h2>
                <div className="home-actions">
                    <button type="button">
                        <Link to="/Form">+ Add Task</Link>
                    </button>
                    <form onSubmit={log_out} style={{ margin: 0 }}>
                        <button type="submit" className="btn-secondary">Log out</button>
                    </form>
                </div>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-group search">
                    <span className="filter-label">Search</span>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <span className="filter-label">Status</span>
                    <select
                        value={statut}
                        onChange={e => setStatut(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="filter-group">
                    <span className="filter-label">Start Date</span>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <span className="filter-label">End Date</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="filter-input"
                    />
                </div>

                {(statut !== 'all' || search || startDate || endDate) && (
                    <button type="button" onClick={clearFilters} className="btn-reset">
                        Reset Filters
                    </button>
                )}
            </div>

            {tasks.length <= 0 ? (
                <div className="empty-state">
                    <span>📋</span>
                    No tasks found matching your filters.
                </div>
            ) : (
                <ul className="task-list">
                    {tasks.map((task, i) => (
                        <li key={i} className="task-card">
                            <div className="task-info">
                                <div className="task-title">{task.title}</div>
                                <div className="task-desc">{task.description}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                                    <span className="task-date">📅 {task.date}</span>
                                    <select
                                        value={task.statut}
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        className={`status-select-inline ${getStatusClass(task.statut)}`}
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                            </div>
                            <div className="task-actions">
                                <Link to={`/Modify/${task.id}`}>Edit</Link>
                                <button type="button" className="btn-danger" onClick={() => removeTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
