import React, { Component } from 'react';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

class App extends Component {
  state = {
    todos: [],
    newTodo: ''
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched todos:', data);
        if (Array.isArray(data.data)) {
          this.setState({ todos: data.data });
        } else {
          console.error('Data fetched is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching todos:', error));
  };

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const newTodo = { name: this.state.newTodo, completed: false };

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data) {
          this.setState(prevState => ({
            todos: [...prevState.todos, data.data],
            newTodo: ''
          }));
        } else {
          console.error('Data received is not as expected:', data);
        }
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  toggleTodo = (id) => {
    fetch(`${URL}/${id}`, {
      method: 'PATCH'
    })
      .then(response => response.json())
      .then(updatedTodo => {
        if (updatedTodo && updatedTodo.data) {
          this.setState(prevState => ({
            todos: prevState.todos.map(todo =>
              todo.id === updatedTodo.data.id ? updatedTodo.data : todo
            )
          }));
        } else {
          console.error('Updated todo data is not as expected:', updatedTodo);
        }
      })
      .catch(error => console.error('Error toggling todo:', error));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed)
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <Form
          newTodo={this.state.newTodo}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          clearCompleted={this.clearCompleted}
        />
        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} />
      </div>
    );
  }
}

export default App;
