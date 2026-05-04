import { TextField, Stack, FormControl, Select, MenuItem, Button } from "@mui/material";

interface TaskSearchProps {
  searchKeyword: string;
  searchStatus: string;
  onKeywordChange: (keyword: string) => void;
  onStatusChange: (status: string) => void;
  onClearParams: () => void;
}

export function TaskSearch({ searchKeyword, searchStatus, onKeywordChange, onStatusChange, onClearParams }: TaskSearchProps) {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        variant="outlined"
        label="Enter keyword to search"
        value={searchKeyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select labelId="search" value={searchStatus} onChange={(e) => onStatusChange(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      
      <Button size="medium" variant="contained" onClick={onClearParams}>
        Clear
      </Button>
    </Stack>
  );
}