import { FC } from "react";

export const SingleTodo: FC<{ item: string; removeTodo: () => void }> = (
  props
) => {
  return <h3 onClick={props.removeTodo}>{props.item}</h3>;
};
