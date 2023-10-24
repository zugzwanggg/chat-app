import { useNavigate } from "react-router-dom"
import {signInWithPopup} from 'firebase/auth'
import { googleAuth, auth } from "../firebase"
import axios from "axios"
import { FC, useEffect,useState } from "react"
import Cookies from 'universal-cookie';

const cookie = new Cookies()




const Login:FC = ({setIsAuth}) => {

  

  

  const [quote,setQuote] = useState<object[]>([])



  useEffect(()=>{

      axios.get('https://api.quotable.io/random').then(res => setQuote(res.data))
  },[])

  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth)
      cookie.set('user-auth', result.user.refreshToken)
      setIsAuth(true)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  console.log(auth.currentUser);
  
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-4">
      <div className="text-center">
        <h1 className="md:text-5xl text-4xl text-zinc-700">{quote.content}</h1>
        <strong className="block text-black my-5 p-4">{quote.author}</strong>
      </div>
      <button onClick={()=>signInWithGoogle()} className="bg-slate-500 p-4 rounded-md hover:bg-slate-700">Sign in</button>
    </div>
  )
}

export default Login