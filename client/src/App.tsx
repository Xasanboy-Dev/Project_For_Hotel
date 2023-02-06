import './App.css'
import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import Layot from './Layout'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import IndexPage from './pages/IndexPage'
import Account from './pages/AccountPage'
import PlacePage from './pages/PlacesPage'
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
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:supage/:action" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
