import { List } from "@mui/material";
import { Diagnosis } from "../../../../../types";
import { DiagnoseListItem } from "./DiagnoseListItem";

export { DiagnoseListItem } from "./DiagnoseListItem";

interface DiagnoseListProps {
  diagnosisCodes: Diagnosis["code"][];
  diagnoses: Diagnosis[];
}

export const DiagnoseList = ({ diagnosisCodes, diagnoses }: DiagnoseListProps) => {

  return <List sx={{ marginLeft: 2 }} component="ul">
    {diagnosisCodes.map((diagnosisCode) => {
      const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === diagnosisCode);
      if (!diagnosis) {
        return <DiagnoseListItem key={diagnosisCode} diagnosis={{ code: diagnosisCode, name: "Unknown" }} />;
      }
      return <DiagnoseListItem key={diagnosisCode} diagnosis={diagnosis} />;
    })}
  </List>;
};