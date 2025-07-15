import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PersonIcon from '@mui/icons-material/Person';
import { Gender } from '../../../types';

interface GenderIconProps {
  gender: Gender;
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  if (gender === Gender.Male) {
    return <MaleIcon color="primary" />;
  } else if (gender === Gender.Female) {
    return <FemaleIcon color="primary" />;
  } else {
    return <PersonIcon color="primary" />;
  }
};

export default GenderIcon;