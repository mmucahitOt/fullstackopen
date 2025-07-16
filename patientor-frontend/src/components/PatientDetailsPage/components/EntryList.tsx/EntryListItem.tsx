import { Box, ListItem, Typography } from "@mui/material";
import { Entry } from "../../../../types";
import { DiagnoseList } from "./components";

interface EntryListItemProps {
  entry: Entry;
}

export const EntryListItem = ({ entry }: EntryListItemProps) => {
  return (
    <ListItem>
      <Box>
        <Typography variant="h6">{entry.date} {entry.description}</Typography>
        <DiagnoseList diagnosisCodes={entry.diagnosisCodes || []} />
      </Box>
    </ListItem>
  );
};