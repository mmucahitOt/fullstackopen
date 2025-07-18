import { useState } from "react";
import { BaseEntryFormInputGroup } from "./components";
import { Button, FormControl, TextField, Box } from "@mui/material";
import { EntryType, HospitalEntryFormValues, ValidationError } from "../../../../../types";
import { createEntry } from "../../../../../services/entryService";



interface HospitalEntryFormProps {
  patientId: string;
  handleError: (error: string) => void;
}

const HospitalEntryForm = ({ patientId, handleError }: HospitalEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entryCreateInput: HospitalEntryFormValues = {
      type: EntryType.hospital,
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      }
    };
    console.log("patientId", patientId);
    console.log("entryCreateInput", entryCreateInput);

    createEntry({ patientId, entryInput: entryCreateInput }).then((entry) => {
      console.log(entry);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setDischargeDate("");
      setDischargeCriteria("");
    }).catch((error) => {
      const errorMessages: ValidationError[] = JSON.parse(error.response.data) as ValidationError[];
      console.log("errorMessages", errorMessages);
      if (errorMessages.length > 0) {
        handleError(errorMessages[0].path.join(".") + ": " + errorMessages[0].message);
      } else {
        handleError("Unknown error");
      }
    });
  };

  return (
    <Box width="100%" maxWidth={600} mx="auto">
      <form onSubmit={handleSubmit} >
        <FormControl component="fieldset" style={{ marginTop: "10px" }}>
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
          <TextField disabled={!date} label="Discharge Date" type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} fullWidth InputLabelProps={{
            shrink: true,
          }} InputProps={{
            inputProps: {
              min: date,
            },
          }} />
          <TextField label="Discharge Criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} fullWidth />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" type="button" onClick={() => {
              setDescription("");
              setDate("");
              setSpecialist("");
              setDiagnosisCodes([]);
              setDischargeDate("");
              setDischargeCriteria("");
            }}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default HospitalEntryForm;