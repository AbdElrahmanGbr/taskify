import React, {useEffect, useRef, useState} from 'react';
import {Todo} from "../model";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";

type Props = {
    todo: Todo, todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>, index: number,
}
const SingleTodo = ({todo, todos, setTodos,index}: Props) => {
    const [edit, setEdit]: [boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] = useState<boolean>(false);
    const [editTodo, setEditTodo]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState<string>(todo.todo);
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
    };
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    const handleEdit = (event: React.FormEvent<HTMLFormElement>, id: number) => {
        event.preventDefault();
        setTodos(todos.map((todo) => (todo.id === id ? {...todo, todo: editTodo} : todo)))
        setEdit(false)
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="todos__single--text"
                            ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text">{todo.todo}</span>
                    )}
                    <div>
            <span
                className="icon"
                onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }}
            >
              <AiFillEdit />
            </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;