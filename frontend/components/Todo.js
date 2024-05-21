import React from 'react';

const Todo = ({ todo, toggleTodo }) => {
  return (
    <li
      onClick={() => toggleTodo(todo.id)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      {todo.name}
    </li>
  );
};

export default Todo;

