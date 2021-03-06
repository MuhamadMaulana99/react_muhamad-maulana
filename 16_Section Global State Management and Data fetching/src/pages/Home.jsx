import React, { useState } from "react";
import TodoList from "./TodoList";
import swal from "sweetalert"


function Home() {
  const [todo, setTodo] = useState({title: "", done: false})
  const[todoArr, setTodoArr] = useState([])

  let todos = localStorage.hasOwnProperty("todos") 
  ? JSON.parse(localStorage.getItem("todos"))
  : []

  const onChange = (event) => {
    let {value} = event.target
    let obj = {}
    obj["title"] = value
    obj["done"] = false
    setTodo(obj)
  }
  const createTodo = (event) => {
    const {name} = event.target
    if(event.key === "Enter" || name === "submit"){
      if(todo.title !== ""){
        todos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        setTodo({ title: "", done: false})
      } else {
        swal("Oops", "Please write todo first", "error")
      }
    }
  }

  const completeTodo = (i) => {
    if (todos[i]["done"] !== true) {
      todos[i]["done"] = true
      localStorage.setItem("todos", JSON.stringify(todos))
      setTodoArr(todos)
      swal("Good job!", "Todo Completed", "success");
    }
  }
  
  const deleteTodo = (i) => {
    swal(
      {
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }). then(res => {
        if(res){
          todos.splice(i, 1)
          localStorage.setItem('todos', JSON.stringify(todos))
          setTodoArr(todos)
        }
      })
  }

  return (
    <>
    <div className="box">
        <div className="text-end">
            <h2>TODOS</h2>
            <h4>Tuliskan Apa Yang Kalian Fikrkan</h4>
        </div>
        <div className="text-submit">
            <input type="text" name="todo" placeholder="Add Todo..."
            value={todo.title} onKeyPress={createTodo} onChange={onChange}/>
            <button className="btn-submit" type="button" name="submit" onClick={createTodo}
            >Submit</button>
        </div>
    </div>
    <TodoList todoArr={todoArr}
    completeTodo={completeTodo} 
    deleteTodo={deleteTodo}/>
   </>
  );
}


export default Home;