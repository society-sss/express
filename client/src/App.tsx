
import MainPage from './Container/mainPage/MainPage'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './Container/adminPage/AdminPage'
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
    </div>
  )
}

export default App
