import './App.css'
import { Route, Routes } from "react-router-dom"
import IndexPage from './pages/INdexPage'
import LoginPage from './pages/LoginPage'
import Layot from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layot />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
