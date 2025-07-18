import { Alert, Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { HospitalEntryForm, OccupationalHealthcareEntryForm, HealthCheckEntryForm } from "./components";
import { useState } from "react";
import { EntryType } from "../../../../types";


interface EntityCreateProps {
  patientId: string;
}

const EntityCreate = ({ patientId }: EntityCreateProps) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.hospital);
  const [error, setError] = useState<string | null>(null);
  return (
    <Box width="100%">
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      <Typography variant="h6">New Entry</Typography>
      <RadioGroup value={entryType} onChange={(e) => setEntryType(e.target.value as EntryType)} row>
        <FormControlLabel value={EntryType.hospital} control={<Radio />} label="Hospital" />
        <FormControlLabel value={EntryType.occupationalHealthcare} control={<Radio />} label="Occupational Healthcare" />
        <FormControlLabel value={EntryType.healthCheck} control={<Radio />} label="Health Check" />
      </RadioGroup>
      {entryType === EntryType.hospital && <HospitalEntryForm patientId={patientId} handleError={(error) => setError(error)} />}
      {entryType === EntryType.occupationalHealthcare && <OccupationalHealthcareEntryForm patientId={patientId} handleError={(error) => setError(error)} />}
      {entryType === EntryType.healthCheck && <HealthCheckEntryForm patientId={patientId} handleError={(error) => setError(error)} />}
    </Box>
  );
};

{/*const EntityCreate = ({ patientId }: EntityCreateProps) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.hospital);
  return (
    <Box>
      <Typography variant="h6">New </Typography>
      <RadioGroup value={entryType} onChange={(e) => setEntryType(e.target.value as EntryType)}>
        <FormControlLabel value={EntryType.hospital} control={<Radio />} label="Hospital" />
        <FormControlLabel value={EntryType.occupationalHealthcare} control={<Radio />} label="Occupational Healthcare" />
        <FormControlLabel value={EntryType.healthCheck} control={<Radio />} label="Health Check" />
      </RadioGroup>
      {entryType === EntryType.hospital && <HospitalEntryForm patientId={patientId} />}
      {entryType === EntryType.occupationalHealthcare && <OccupationalHealthcareEntryForm patientId={patientId} />}
      {entryType === EntryType.healthCheck && <HealthCheckEntryForm patientId={patientId} />}
    </Box>
  );
};*/}

export default EntityCreate;
