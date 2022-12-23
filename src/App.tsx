import React, {useState} from 'react';
import './App.css';
import InputField from "./components/InputField";
import {Todo} from "./model";

function App() {
    const [todo, setTodo]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");
    const [todos, setTodos]: [Todo[], ((value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void)] = useState<Todo[]>([])
    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTodos([...todos, {id:Date.now(), todo:todo,isDone:false}]);
        setTodo("");
    };
    console.log('todos',todos);
  return (
    <div className="App">
        <span className={"heading"}>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        {/*<TodoList/>*/}
        {todos.map((todo)=>(
            <li>{todo.todo}</li>
            ))}
    </div>
  );
}

export default App;
