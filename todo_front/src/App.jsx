import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Register";
import Home from "./ProtectedRoute/Home";
import Form from "./ProtectedRoute/Form";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProider } from "./context/AuthContext";
import Modify from "./ProtectedRoute/Modify";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AuthProider>
      <div className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Modify/:id" element={<Modify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProider>
  )
}
