import './App.css'
import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import Layot from './Layout'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import IndexPage from './pages/IndexPage'
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
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
