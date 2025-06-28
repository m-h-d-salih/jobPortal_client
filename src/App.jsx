import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import './App.css'
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/NavBar';
import MyJobs from './pages/MyJobs';
import SavedJobs from './pages/SavedJobs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Toaster/>
       <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Navbar />}>
          
            <Route path="/" element={<Home />} />
            <Route path="/myjobs" element={<MyJobs />} />
            <Route path="/savedjobs" element={<SavedJobs />} />
            
          </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
