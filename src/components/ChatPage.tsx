import { useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import Cookies from 'universal-cookie';

const cookie = new Cookies()

const ChatPage = () => {

  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [urMessage, setUrMessage] = useState<string>('')
  const [messages, setMessages] = useState<object[]>([])


 

  const messagesRef = collection(db, 'messages')

  


  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      cookie.remove('user-auth')
      navigate('/login')
    } catch(err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (urMessage.length < 1) {
      return setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
    setUrMessage('')
    await addDoc(messagesRef, {
      text: urMessage,
      date: serverTimestamp(),
      user: auth.currentUser?.displayName
    })
  } 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(false)
    setUrMessage(e.target.value)
  }

  useEffect(()=>{
    const messageQuery = query(messagesRef,orderBy('date'))

    const unsuscribe = onSnapshot(messageQuery, (snapshot)=>{
      let messages:object[] = []
      snapshot.forEach((doc)=>{
        messages.push({...doc.data(), id: doc.id})
      })
      setMessages(messages)
    })

    return () => unsuscribe()
  },[])


  return (
    <div className="rounded-md mt-8 flex flex-col justify-between bg-slate-200">
      <div className="bg-slate-800 p-4 rounded-t-md flex items-center justify-between">
        <h1>Chat app</h1>
        <button onClick={logOut} className="px-4 py-2 rounded-lg bg-slate-600 text-white">Logout</button>
      </div>
      <div className="h-96 overflow-y-scroll">
        
        {
          messages.map((item:any) => item.user == auth.currentUser?.displayName 
          ? 
          <div key={item.message} className="break-words ml-auto bg-slate-400 w-1/2 m-4 p-4 rounded-md">
              <p className="text-slate-700">{item.user}:</p>
              <h1>{item.text}</h1>
          </div>
          :
          <div className="bg-slate-500 break-words w-1/2 r m-4 p-4 rounded-md ">
              <p>{item.user}:</p>
              <h1>{item.text}</h1>
          </div>
          )
        }
        
      </div>
      <form onSubmit={(e)=>handleSubmit(e)} className=" flex item-center">
        <input onChange={(e)=>handleChange(e)} value={urMessage} className={`text-blue-950 py-4 px-6 outline-none w-screen ${isEmpty ? 'border-2 border-red-400' : ''}`} placeholder="Message" type="text" />
        <button className=" py-4 px-8 bg-slate-400 hover:bg-slate-700">Submit</button>
      </form>
    </div>
  )
}

export default ChatPage