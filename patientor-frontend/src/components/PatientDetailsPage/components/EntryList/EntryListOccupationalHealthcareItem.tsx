import { Box, ListItem, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryListOccupationalHealthcareItemProps {
  entry: OccupationalHealthcareEntry;
}

export const EntryListOccupationalHealthcareItem = ({ entry }: EntryListOccupationalHealthcareItemProps) => {

  return (
    <ListItem sx={{ border: "1px solid #e0e0e0", borderRadius: 1, padding: 1, marginBottom: 1, backgroundColor: "#f0f0f0" }}>
      <Box>
        <Typography variant="h6">{entry.date} <LocalHospitalIcon /> {entry.employerName}</Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <Typography variant="body1">diagned By {entry.specialist}</Typography>
        <Typography variant="body1">Employer: {entry.employerName}</Typography>
      </Box>
    </ListItem>
  );
};