import { Box, ListItem, Typography } from "@mui/material";
import { HospitalEntry } from "../../../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryListHospitalItemProps {
  entry: HospitalEntry;
}

export const EntryListHospitalItem = ({ entry }: EntryListHospitalItemProps) => {

  return (
    <ListItem sx={{ border: "1px solid #e0e0e0", borderRadius: 1, padding: 1, marginBottom: 1, backgroundColor: "#f0f0f0" }}>
      <Box>
        <Typography variant="h6">{entry.date} <LocalHospitalIcon /></Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <Typography variant="body1">Diagned By {entry.specialist}</Typography>
      </Box>
    </ListItem>
  );
};