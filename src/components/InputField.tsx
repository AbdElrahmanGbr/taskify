import React from 'react';
import './style.css';

interface Props{
    todo: string,
    setTodo: (value: (string | ((prevState: string) => string))) => void,
    handleAdd: (event: React.FormEvent<HTMLFormElement>) => void
}
const InputField = ({todo, setTodo, handleAdd}: Props) => {
    return (
        <form className={"input"}  onSubmit={(event)=>handleAdd(event)}>
            <input type={"input"}
                   value={todo}
                   onChange={(event) => setTodo(event.target.value)}
                   placeholder={"Enter A Task"} className={"input__box"}/>
            <button className={"input_submit"} type={"submit"}>Go</button>
        </form>
    );
};

export default InputField;