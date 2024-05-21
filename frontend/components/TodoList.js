import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo }) => {
  if (!Array.isArray(todos)) {
    return null; // or some fallback UI
  }

  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default TodoList;

