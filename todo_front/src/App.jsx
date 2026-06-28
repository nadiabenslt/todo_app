import { BrowserRouter, Routes,Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Form from "./Form";
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
