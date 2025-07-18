import { Box, ListItem, Typography } from "@mui/material";
import { HealthCheckEntry, HealthCheckRating } from "../../../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryListHealthCheckItemProps {
  entry: HealthCheckEntry;
}

export const EntryListHealthCheckItem = ({ entry }: EntryListHealthCheckItemProps) => {

  return (
    <ListItem sx={{ border: "1px solid #e0e0e0", borderRadius: 1, padding: 1, marginBottom: 1, backgroundColor: "#f0f0f0" }}>
      <Box>
        <Typography variant="h6">{entry.date} <MonitorHeartIcon /></Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <HealthCheckRatingIcon rating={entry.healthCheckRating} />
        <Typography variant="body1">Diagned By {entry.specialist}</Typography>
      </Box>
    </ListItem>
  );
};

interface HealthCheckRatingIconProps {
  rating: HealthCheckRating;
}

const HealthCheckRatingIcon = ({ rating }: HealthCheckRatingIconProps) => {
  switch (rating) {
    case HealthCheckRating.healthy:
      return <FavoriteIcon color="success" />;
    case HealthCheckRating.lowRisk:
      return <FavoriteIcon color="warning" />;
    case HealthCheckRating.highRisk:
      return <FavoriteIcon color="error" />;
    case HealthCheckRating.criticalRisk:
      return <FavoriteIcon color="error" />;
    default:
      return <FavoriteIcon color="success" />;
  }
};  