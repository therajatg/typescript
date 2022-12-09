import { FC, FormEvent, useRef } from "react";

export const NewTodo: FC<{ addTodo: (text: string) => void }> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredText = inputRef.current!.value;
    if (enteredText.trim() === "") {
      //Throw some error
    } else {
      props.addTodo(enteredText);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text"></label>
      <input type="text" id="text" ref={inputRef} />
      <button>Add Todo</button>
    </form>
  );
};
