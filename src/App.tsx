import React, {useState} from 'react';
import './App.css';
import InputField from "./components/InputField";
import {Todo} from "./model";
import TodoList from "./components/TodoList";
import {DragDropContext, DropResult} from "react-beautiful-dnd";

function App() {
    const [todo, setTodo]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");
    const [todos, setTodos]: [Todo[], ((value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void)] = useState<Todo[]>([])
    const [completedTodos, setCompletedTodos]: [Todo[], ((value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void)] = useState<Todo[]>([]);
    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
        setTodo("");
    };
    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        let add;
        let active = todos;
        let complete = completedTodos;
        // Source Logic
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }
        // Destination Logic
        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }
        setCompletedTodos(complete);
        setTodos(active);
    };
    return (<DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className={"heading"}>Taskify</span>
                <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos}
                          setCompletedTodos={setCompletedTodos}/>
            </div>
        </DragDropContext>);
}

export default App;
