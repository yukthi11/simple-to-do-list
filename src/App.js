import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css"; // Import your CSS file

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setShowGif(true); // Show GIF when a task is completed
  };

  // Show the GIF overlay for 5 seconds (5000 ms)
  useEffect(() => {
    if (showGif) {
      const timer = setTimeout(() => setShowGif(false), 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showGif]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      {showGif && (
        <div className="gif-overlay">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2xyMmM3bjlyOWpueDZteXZrdjN5NWY0NGVyNXRvMXllb243cDhsbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ely3apij36BJhoZ234/giphy.gif"
            alt="Task Complete!"
            className="fullscreen-gif"
          />
        </div>
      )}
      <h1>📝 To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
