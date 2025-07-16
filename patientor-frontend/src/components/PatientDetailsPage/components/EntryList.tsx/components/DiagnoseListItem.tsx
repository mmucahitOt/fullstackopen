import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Diagnosis } from "../../../../../types";
import CircleIcon from '@mui/icons-material/Circle';

interface DiagnoseListItemProps {
  diagnosis: Diagnosis
}

export const DiagnoseListItem = ({ diagnosis }: DiagnoseListItemProps) => {
  return <ListItem sx={{ padding: 0 }}>
    <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: "center" }}>
      <CircleIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary={diagnosis.code + " " + diagnosis.name} sx={{ marginLeft: 2 }} />
  </ListItem>;
};