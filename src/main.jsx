import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "./components/Register";
import Login from './components/Login'
import { Orders } from './components/Order/Order';
import { Navi } from './components/Navigation';
import { CreateOrder } from './components/Order/CreateOrder';
import "./App.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
            <Navi/>
            <Routes>
                <Route path="/" element={<Login/>}/>                        
                <Route path="/register" element={<Register/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/create-order" element={<CreateOrder/>}/>
            </Routes>
  </Router>
)
