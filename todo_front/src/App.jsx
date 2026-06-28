import { BrowserRouter, Routes,Route } from "react-router-dom";
import Register from "./Register";
import Home from "./ProtectedRoute/Home";
import Form from "./ProtectedRoute/Form";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProider>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<Form />} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
    </AuthProider>
    
  )
}
