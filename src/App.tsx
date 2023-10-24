import {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import ChatPage from './components/ChatPage'
import Login from './components/Login'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookie = new Cookies()

function App() {

 

  const [isAuth, setIsAuth] = useState(cookie.get('user-auth'))


  const navigate = useNavigate()

 
  
  
  useEffect(()=>{
    if (isAuth) {
      navigate('/')
    } else {
      navigate('/login')
    }
  },[])

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<ChatPage/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </div>
  )
}

export default App
