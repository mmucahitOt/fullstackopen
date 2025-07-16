import { List } from "@mui/material";
import { Diagnosis } from "../../../../../types";
import { DiagnoseListItem } from "./DiagnoseListItem";

export { DiagnoseListItem } from "./DiagnoseListItem";

interface DiagnoseListProps {
  diagnosisCodes: Diagnosis["code"][];
}

export const DiagnoseList = ({ diagnosisCodes }: DiagnoseListProps) => {
  return <List sx={{ marginLeft: 2 }} component="ul">
    {diagnosisCodes.map((diagnosisCode) => (
      <DiagnoseListItem key={diagnosisCode} diagnosisCode={diagnosisCode} />
    ))}
  </List>;
};