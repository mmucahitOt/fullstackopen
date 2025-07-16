import {        ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Diagnosis } from "../../../../../types";
import CircleIcon from '@mui/icons-material/Circle';

interface DiagnoseListItemProps {
  diagnosisCode: Diagnosis["code"];
}

export const DiagnoseListItem = ({ diagnosisCode }: DiagnoseListItemProps) => {
  return <ListItem sx={{ padding: 0 }}>
    <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: "center" }}>
      <CircleIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary={diagnosisCode} sx={{ marginLeft: 2 }} />
  </ListItem>;
};