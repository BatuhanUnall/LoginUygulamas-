import { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Home } from './Components/Home';
import { Navbar } from './Components/Navbar';
import axios from 'axios';


export const isLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    axios.get("http://localhost:3001/user", { withCredentials: true })
      .then(response => {
        if (response.data.user) {
          setIsLoggedIn(true)

        }
        else {
          setIsLoggedIn(false)
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, [])

  return (
    <>
      <isLoggedInContext.Provider value={isLoggedIn}><SetIsLoggedInContext.Provider value={setIsLoggedIn}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />}>
            </Route>
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />}>
            </Route>
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />}>
            </Route>



          </Routes>
        </BrowserRouter>
      </SetIsLoggedInContext.Provider>
      </isLoggedInContext.Provider>
    </>
  )
}

export default App