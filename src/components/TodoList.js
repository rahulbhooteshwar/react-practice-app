import React from 'react';
const TodoList = props => {
  console.log("rendering list...");
  return (
    <ul>
      {
        props.items.map((todo, index) => {
          return (
            <li key={todo.id}>
              {todo.name}
                | <button className="custom" onClick={() => props.onDelete(todo.id)}>REMOVE</button>
            </li>
          )
        })
      }
    </ul>
  );
};
export default TodoList;