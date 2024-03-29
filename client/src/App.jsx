import axios from 'axios'
import { Route, Routes } from "react-router-dom"
import Layout from './Layout'; 
import Index from './pages/Index';
import  { RequireAuth }  from "react-auth-kit";
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Report from './pages/Report';

export default function App() {

  axios.defaults.baseURL = "http://localhost:4000";

  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RequireAuth loginPath="/login">
          <Index />
        </RequireAuth>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/report" element={<Report/>}/>
      </Route>
    </Routes>

  )
}

