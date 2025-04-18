import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs =(params) =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleEdit = (e, id) => {
   let to=todos.filter(i=>i.id ===id)
   setTodo(to[0].todo)

  let newTodos =todos.filter(item=>{
    return item.id!=id;
  })
  setTodos(newTodos)
  saveToLs()

  }

  const handleDelete = (e, id) => {
    let newTodos =todos.filter(item=>{
      return item.id!=id;
    })
    setTodos(newTodos)
    saveToLs()

  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handelBox=(e)=>{
    let id=e.target.name;
    let index = todos.findIndex(item=>{
      return item.id==id;
    })

    let newTodos =[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()

  }

  const togleFinished =(e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <main>
        <div className='md:container md:w-[80%] bg-green-200 mx-auto my-5 min-h-[80vh] rounded-md p-2 font-sans md:flex gap-5'>
          <div className='AddTodo flex flex-col items-center'>
            <h1 className='font-bold text-center my-5 text-2xl rounded-tr-3xl rounded-bl-3xl bg-[#454ADE] p-3 text-[#E1BBC9]'>Add Todo</h1>
            <div>
              <input type="text" className='bg-white outline-none md:w-120 w-80 p-2 rounded-xl mx-2' placeholder='Add here' onChange={handleChange} value={todo} />
              <button onClick={handleAdd} disabled={todo.length<=3} className='bg-green-500 md:m-0 ml-15 mt-1 mb-2 md:w-20 w-50 p-2 rounded-xl font-semibold disabled:bg-red-600'>Save</button>
            </div>
          </div>
          <div className='YourTodo md:w-120 md:min-h-50 min-h-100 bg-[#C874D9] px-5 py-2 rounded-xl'>
            <div className='font-bold md:mx-40md:my-3 text-xl  bg-[#E1BBC9] rounded-xl text-[#1B1F3B] p-2 text-center m-1'>Your Todos</div>
            <div className='flex gap-1 mb-2 font-semibold'>
            <input type="checkbox" checked={showFinished} onChange={togleFinished} id='show'/> 
            <label htmlFor="show">Show finished</label>
            </div>
            {todos.length===0 && <div className='text-3xl text-gray-500 text-center font-semibold'>No Todos</div>}
            {todos.map(item=>{
              return (showFinished || !item.isCompleted) && <div key={item.id} className='Todo flex justify-between m-2 bg-amber-100 rounded-xl py-1 px-2'>
                <div className='flex gap-4 items-center'>
                <input name={item.id} onChange={handelBox} type="checkbox" checked={item.isCompleted}/>
                 <div className={item.isCompleted?"line-through":""}>
                  {item.todo}
                </div>
                </div>
                <div className='Btns flex h-full'>
                  <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-green-500 px-3 py-1 rounded-xl m-1'><FaEdit /></button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-green-500 px-3 py-1 rounded-xl m-1'><FaDeleteLeft /></button>
                </div>
              </div>
               })}
          </div>
        </div>
      </main>

    </>
  )
}

export default App
