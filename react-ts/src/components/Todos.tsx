import { FC } from "react";
import { Todo } from "../models/todo";
import { SingleTodo } from "./SingleTodo";

export const Todos: FC<{ items: Todo[]; removeTodo: (id: string) => void }> = (
  props
) => {
  return (
    <ul>
      {props.items.map((todoItem) => (
        <SingleTodo
          item={todoItem.text}
          removeTodo={props.removeTodo.bind(null, todoItem.id)}
          key={todoItem.id}
        />
      ))}
    </ul>
  );
};
