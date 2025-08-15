import React from "react";

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <button className="remove-btn" onClick={() => deleteTodo(todo.id)}>Remove</button>
    </li>
  );
}

export default TodoItem;
