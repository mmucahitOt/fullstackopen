import { TextField } from "@mui/material";
import { MultipleChoiceArrayInput } from "../../../../common";
import { useEffect, useState } from "react";
import { getDiagnosisCodes } from "../../../../../services/diagnosisService";


interface BaseEntryFormInputGroupProps {
  description: string
  descriptionSetter: (description: string) => void;
  date: string
  dateSetter: (date: string) => void;
  specialist: string
  specialistSetter: (specialist: string) => void;
  diagnosisCodes: string[]
  diagnosisCodesSetter: (diagnosisCodes: string[]) => void;
}

const BaseEntryFormInputGroup = ({ description, date, specialist, diagnosisCodes, descriptionSetter, dateSetter, specialistSetter, diagnosisCodesSetter }: BaseEntryFormInputGroupProps) => {
  const [diagnosisCodeList, setDiagnosisCodeList] = useState<string[]>([]);
  useEffect(() => {
    getDiagnosisCodes().then((codes) => setDiagnosisCodeList(codes)).catch((error) => console.error(error));
  }, [diagnosisCodes]);

  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() + 1);
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <>
      <TextField label="Description" value={description} onChange={(e) => descriptionSetter(e.target.value)} fullWidth />
      <TextField label="Date" type="date" value={date} onChange={(e) => dateSetter(e.target.value)} fullWidth InputLabelProps={{
        shrink: true,
      }} InputProps={{
        inputProps: {
          min: minDateString,
        },
      }} />
      <TextField label="Specialist" value={specialist} onChange={(e) => specialistSetter(e.target.value)} fullWidth />
      <MultipleChoiceArrayInput options={diagnosisCodeList} selected={diagnosisCodes} setter={diagnosisCodesSetter} label="Diagnosis Codes" />
    </>
  );
};

export default BaseEntryFormInputGroup;