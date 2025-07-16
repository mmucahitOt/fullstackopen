import { Box, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../../../types";
import { DiagnoseList } from "./components";
import { useEffect, useState } from "react";
import diagnosisService from "../../../../services/diagnosisService";

interface EntryListItemProps {
  entry: Entry;
}

export const EntryListItem = ({ entry }: EntryListItemProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => setDiagnoses(diagnoses));
  }, []);
  return (
    <ListItem>
      <Box>
        <Typography variant="h6">{entry.date} {entry.description}</Typography>
        <DiagnoseList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes || []} />
      </Box>
    </ListItem>
  );
};