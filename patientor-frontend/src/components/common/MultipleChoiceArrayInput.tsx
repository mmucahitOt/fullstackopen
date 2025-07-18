import { Autocomplete, TextField, Box } from "@mui/material";

interface MultipleChoiceArrayInputProps {
  options: string[];
  selected: string[];
  setter: (selected: string[]) => void;
  label: string;
}

const MultipleChoiceArrayInput = ({ options, selected, setter, label }: MultipleChoiceArrayInputProps) => (
  <Box mt={2} mb={2} width="100%">
    <Autocomplete
      multiple
      options={options}
      value={selected}
      onChange={(_, value) => setter(value)}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
      disableCloseOnSelect
      fullWidth
    />
  </Box>
);

export default MultipleChoiceArrayInput;