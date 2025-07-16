import { Box, List, Typography } from "@mui/material";
import { Entry } from "../../../../types";
import { EntryListItem } from "./EntryListItem";

export { EntryListItem } from "./EntryListItem";

interface EntryListProps {
  entries: Entry[];
}

const EntryList = ({ entries }: EntryListProps) => {

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography sx={{ fontWeight: "bold" }} variant="h6">Entries</Typography>
      <List>
        {entries.map((entry) => (
          <EntryListItem key={entry.id} entry={entry}/>
        ))}
      </List>
    </Box>);
};

export default EntryList;