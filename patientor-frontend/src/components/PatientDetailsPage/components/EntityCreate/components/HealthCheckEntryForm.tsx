import { useState } from "react";
import { BaseEntryFormInputGroup } from "./components";
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Box } from "@mui/material";
import { EntryType, HealthCheckEntryFormValues, HealthCheckRating, ValidationError } from "../../../../../types";
import { createEntry } from "../../../../../services/entryService";

interface HealthCheckEntryFormProps {
  patientId: string;
  handleError: (error: string) => void;
}

const HealthCheckEntryForm = ({ patientId, handleError }: HealthCheckEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.healthy);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entryCreateInput: HealthCheckEntryFormValues = {
      type: EntryType.healthCheck,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
    };

    createEntry({ patientId, entryInput: entryCreateInput }).then((entry) => {
      console.log(entry);
    }).catch((error) => {
      const errorMessages: ValidationError[] = JSON.parse(error.response.data) as ValidationError[];
      if (errorMessages.length > 0) {
        handleError(errorMessages[0].path.join(".") + ": " + errorMessages[0].message);
      } else {
        handleError("Unknown error");
      }
    });
  };
  return (
    <Box width="100%" maxWidth={600} mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <BaseEntryFormInputGroup
            description={description}
            date={date}
            specialist={specialist}
            diagnosisCodes={diagnosisCodes}
            descriptionSetter={setDescription}
            dateSetter={setDate}
            specialistSetter={setSpecialist}
            diagnosisCodesSetter={setDiagnosisCodes}
          />
          <RadioGroup value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value as unknown as HealthCheckRating)} row>
            <FormControlLabel value={HealthCheckRating.healthy} control={<Radio />} label="Healthy" />
            <FormControlLabel value={HealthCheckRating.lowRisk} control={<Radio />} label="Low Risk" />
            <FormControlLabel value={HealthCheckRating.highRisk} control={<Radio />} label="High Risk" />
            <FormControlLabel value={HealthCheckRating.criticalRisk} control={<Radio />} label="Critical Risk" />
          </RadioGroup>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" type="button" onClick={() => {
              setDescription("");
              setDate("");
              setSpecialist("");
              setDiagnosisCodes([]);
              setHealthCheckRating(HealthCheckRating.healthy);
            }}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default HealthCheckEntryForm;