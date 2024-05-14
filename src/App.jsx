import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './todo.css'
const initialState = {
  tasks: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task, index) => index !== action.payload) };
    default:
      return state;
  }
}

const store = createStore(todoReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>To-Do List</h1>
        <TaskInput />
        <TaskList />
      </div>
    </Provider>
  );
}

function TaskInput() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: task });
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_TASK', payload: index });
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default App
