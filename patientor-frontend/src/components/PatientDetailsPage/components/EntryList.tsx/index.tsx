import { Box, List, Typography } from "@mui/material";
import { Entry, EntryType } from "../../../../types";
import { EntryListHealthCheckItem } from "./EntryListHealthCheckItem";
import { EntryListOccupationalHealthcareItem } from "./EntryListOccupationalHealthcareItem";
import { EntryListHospitalItem } from "./EntryListHospitalItem ";

interface EntryListProps {
  entries: Entry[];
}

const EntryList = ({ entries }: EntryListProps) => {

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.healthCheck:
        return <EntryListHealthCheckItem key={entry.id} entry={entry} />;
      case EntryType.occupationalHealthcare:
        return <EntryListOccupationalHealthcareItem key={entry.id} entry={entry} />;
      case EntryType.hospital:
        return <EntryListHospitalItem key={entry.id} entry={entry} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography sx={{ fontWeight: "bold" }} variant="h6">Entries</Typography>
      <List>
        {entries.map((entry) => renderEntry(entry))}
      </List>
    </Box>);
};

export default EntryList;