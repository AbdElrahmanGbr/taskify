import React, {useRef} from 'react';
import './style.css';

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (event: React.FormEvent<HTMLFormElement>) => void
}
const InputField = ({todo, setTodo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className={"input"}
              onSubmit={(event)=>{
                  handleAdd(event)
                  inputRef.current?.blur();
        }}>
            <input type={"input"}
                   ref={inputRef}
                   value={todo}
                   onChange={(event) => setTodo(event.target.value)}
                   placeholder={"Enter A Task"} className={"input__box"}/>
            <button className={"input_submit"} type={"submit"}>Go</button>
        </form>
    );
};

export default InputField;