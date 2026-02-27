import { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:5098/api/todos";
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Load todos from API
  const loadTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Create todo
  const addTodo = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTodos();
  };

  // Toggle completed
  const toggleTodo = async (todo) => {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        isCompleted: !todo.isCompleted,
      }),
    });
    loadTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    loadTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My To‑Do List</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New to-do"
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleTodo(t)}
              style={{
                textDecoration: t.isCompleted ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.title}
            </span>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteTodo(t.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;