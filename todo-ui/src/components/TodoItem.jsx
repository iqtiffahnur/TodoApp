import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function TodoItem({ todo, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const startEdit = () => setEditing(true);
  const cancelEdit = () => {
    setTitle(todo.title);
    setEditing(false);
  };
  const confirmEdit = async () => {
    const t = title.trim();
    if (!t) return;
    await onRename(todo.id, t);
    setEditing(false);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        editing ? (
          <>
            <Tooltip title="Save">
              <IconButton edge="end" onClick={confirmEdit}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton edge="end" onClick={cancelEdit}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton edge="end" onClick={startEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton edge="end" color="error" onClick={() => onDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
      sx={{ px: 1 }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo)}
        />
      </ListItemIcon>

      {editing ? (
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
        />
      ) : (
        <ListItemText
          primary={todo.title}
          sx={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
            color: todo.isCompleted ? "text.disabled" : "text.primary",
          }}
        />
      )}
    </ListItem>
  );
}