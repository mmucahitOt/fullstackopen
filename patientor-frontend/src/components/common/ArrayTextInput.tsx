import React from "react";
import { TextField, Button, Box } from "@mui/material";

interface ArrayTextInputProps {
  values: string[];
  setter: (values: string[]) => void;
}

const ArrayTextInput = ({ values, setter }: ArrayTextInputProps) => {

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setter(newValues);
  };

  const handleAdd = () => {
    setter([...values, ""]);
  };

  const handleRemove = (index: number) => {
    setter(values.filter((_, i) => i !== index));
  };

  return (
    <Box>
      {values.map((value, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <TextField
            label={`Input ${index + 1}`}
            value={value}
            onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
            sx={{ mr: 1 }}
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRemove(index)}
            disabled={values.length === 1}
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAdd}>
        Add Input
      </Button>
    </Box>
  );
};

export default ArrayTextInput;