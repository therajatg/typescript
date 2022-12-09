import "./App.css";
import { Todos } from "./components/Todos";
import { Todo } from "./models/todo";
import { NewTodo } from "./components/NewTodo";
import { useState } from "react";

function App() {
  // const todos = [new Todo("Learn React"), new Todo("Learn TypeScript")];
  const [todos, setTodos] = useState<Todo[]>([]);
  const addToDo = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prev) => [...prev, newTodo]);
  };
  const removeTodo = (id: string) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
  };
  return (
    <div className="App">
      <NewTodo addTodo={addToDo} />
      <Todos items={todos} removeTodo={removeTodo} />
    </div>
  );
}

export default App;
