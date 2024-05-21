import React from 'react';

const Form = ({ newTodo, handleInputChange, handleFormSubmit, clearCompleted }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
      <button type="button" onClick={clearCompleted}>Clear Completed</button>
    </form>
  );
};

export default Form;
