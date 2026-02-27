import { List, Paper } from "@mui/material";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onRename }) {
  return (
    <Paper elevation={0} sx={{ overflow: "hidden" }}>
      <List disablePadding>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onRename={onRename}
          />
        ))}
      </List>
    </Paper>
  );
}