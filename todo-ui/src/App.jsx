import { useEffect, useMemo, useState } from "react";
import { Container, Box, Card, CardContent, Stack, Typography, Snackbar, Alert } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import { buildTheme } from "./theme/theme";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/client";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => buildTheme(darkMode ? "dark" : "light"), [darkMode]);
  const [todos, setTodos] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => setToast({ open: true, message, severity });

  const load = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch {
      showToast("Failed to load to‑dos", "error");
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (title) => {
    try {
      await createTodo(title);
      await load();
      showToast("To‑do added");
    } catch {
      showToast("Failed to add to‑do", "error");
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo.id, { title: todo.title, isCompleted: !todo.isCompleted });
      await load();
    } catch {
      showToast("Failed to update to‑do", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await load();
      showToast("Deleted");
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  const handleRename = async (id, newTitle) => {
    try {
      const todo = todos.find(t => t.id === id);
      await updateTodo(id, { title: newTitle, isCompleted: todo?.isCompleted ?? false });
      await load();
      showToast("Updated");
    } catch {
      showToast("Failed to update", "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(v => !v)} />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4" gutterBottom>Tasks</Typography>
                <Typography color="text.secondary">Plan your work and track progress.</Typography>
              </Box>

              <TodoForm onAdd={handleAdd} />

              {todos.length === 0 ? (
                <EmptyState />
              ) : (
                <TodoList
                  todos={todos}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}