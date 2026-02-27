import { Box, Typography } from "@mui/material";

export default function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "text.secondary",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        p: 5,
      }}
    >
      <Typography variant="h6" gutterBottom>No to‑dos yet</Typography>
      <Typography variant="body2">Add your first task using the field above.</Typography>
    </Box>
  );
}