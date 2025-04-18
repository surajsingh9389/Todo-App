import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Footer from "./components/Footer";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let to = todos.filter((i) => i.id === id);
    setTodo(to[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handelBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  const togleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(70%_70%_at_50%_10%,#5899E2_40%,#65AFFF_100%)]"></div>
      <main>
          <div className="container text-white min-w-[70vw] mt-10 pb-1 mx-auto min-h-[70vh] rounded-md p-2 font-sans flex flex-col justify-center items-center gap-10">
            <div className="AddTodo flex flex-col items-center">
              <h1 className="font-bold min-w-60 text-center my-5 text-xl rounded-2xl bg-[#1B2845] px-5 py-2 flex items-center gap-3">
                Create your Todo List <span><img src="./List.gif" width={40} alt="" /></span>
              </h1>
              <div className="search flex flex-col justify-center items-center gap-2">
                <input
                  type="text"
                  className="bg-white text-slate-950 text-lg outline-none md:w-120 w-80 p-2 rounded-xl mx- items-center2 border border-[#274060]"
                  placeholder="Add here"
                  onChange={handleChange}
                  value={todo}
                />
                <button
                  onClick={handleAdd}
                  disabled={todo.length <= 3}
                  className="bg-green-500 border border-gray-700 w-40 p-2 rounded-xl font-semibold disabled:bg-red-600"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="YourTodo bg-[#335C81] w-[60vw] min-h-[35vh] px-5 py-2 rounded-xl">
              <div className="font-bold md:mx-40md:my-3 text-xl  bg-[#1B2845] rounded-xl p-2 text-center m-1">
                Your Todos
              </div>
              <div className="flex gap-1 mb-2 font-semibold">
                <input
                  type="checkbox"
                  checked={showFinished}
                  onChange={togleFinished}
                  id="show"
                />
                <label htmlFor="show">Show finished</label>
              </div>
              <div className="h-1 bg-white opacity-25"></div>
              {todos.length === 0 && (
                <div className="text-xl text-white opacity-70 font-semibold py-2 pl-5">
                  No Todos
                </div>
              )}
              {todos.map((item) => {
                return (
                  (showFinished || !item.isCompleted) && (
                    <div
                      key={item.id}
                      className="Todo flex justify-between m-2 bg-[#274060] rounded-xl py-1 px-2"
                    >
                      <div className="flex gap-4 items-center">
                        <input
                          name={item.id}
                          onChange={handelBox}
                          type="checkbox"
                          checked={item.isCompleted}
                        />
                        <div className={item.isCompleted ? "line-through" : ""}>
                          {item.todo}
                        </div>
                      </div>
                      <div className="Btns flex h-full">
                        <button
                          onClick={(e) => {
                            handleEdit(e, item.id);
                          }}
                          className="bg-green-500 px-3 py-1 rounded-xl m-1"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={(e) => {
                            handleDelete(e, item.id);
                          }}
                          className="bg-green-500 px-3 py-1 rounded-xl m-1"
                        >
                          <FaDeleteLeft />
                        </button>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
