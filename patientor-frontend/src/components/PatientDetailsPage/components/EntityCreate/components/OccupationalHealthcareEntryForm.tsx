import { useState } from "react";
import { BaseEntryFormInputGroup } from "./components";
import { Button, FormControl, TextField, Box } from "@mui/material";
import { EntryType, OccupationalHealthcareEntryFormValues, ValidationError } from "../../../../../types";
import { createEntry } from "../../../../../services/entryService";



interface OccupationalHealthcareEntryFormProps {
  patientId: string;
  handleError: (error: string) => void;
}

const OccupationalHealthcareEntryForm = ({ patientId, handleError }: OccupationalHealthcareEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entryCreateInput: OccupationalHealthcareEntryFormValues = {
      type: EntryType.occupationalHealthcare,
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      }
    };

    createEntry({ patientId, entryInput: entryCreateInput }).then((entry) => {
      console.log(entry);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
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
          <TextField label="Employer Name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} fullWidth />
          <TextField disabled={!date} label="Sick Leave Start Date" type="date" value={sickLeaveStartDate} onChange={(e) => setSickLeaveStartDate(e.target.value)} fullWidth InputLabelProps={{
            shrink: true,
          }} InputProps={{
            inputProps: {
              min: date,
            },
          }} />
          <TextField disabled={!sickLeaveStartDate} label="Sick Leave End Date" type="date" value={sickLeaveEndDate} onChange={(e) => setSickLeaveEndDate(e.target.value)} fullWidth InputLabelProps={{
            shrink: true,
          }} InputProps={{
            inputProps: {
              min: sickLeaveStartDate,
            },
          }} />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" type="button" onClick={() => {
              setDescription("");
              setDate("");
              setSpecialist("");
              setDiagnosisCodes([]);
              setEmployerName("");
              setSickLeaveStartDate("");
              setSickLeaveEndDate("");
            }}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default OccupationalHealthcareEntryForm;