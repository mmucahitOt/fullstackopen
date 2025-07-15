import { useEffect, useState } from "react";
import { Alert, Box, Card, CardContent, Typography } from '@mui/material';
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import axios from "axios";
import GenderIcon from "./components/GenderIcon";


const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(patient => setPatient(patient)).catch(error => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.error || "Unrecognized axios error");
        } else {
          setError("Unknown error");
        }
      });
    }
  }, [id]);

  return (
    <> {error && <Alert severity="error">{error}</Alert>}
      {patient && (
        <div className="App">
          <Box>
            <Card>
              <CardContent>
                <Typography align="center" variant="h4">Patient Details</Typography>
                <Typography variant="h6">Name: {patient?.name} <GenderIcon gender={patient?.gender as Gender} /></Typography>
                <Typography variant="h6">Date of Birth: {patient?.dateOfBirth}</Typography>
                <Typography variant="h6">SSN: {patient?.ssn}</Typography>
                <Typography variant="h6">Occupation: {patient?.occupation}</Typography>
              </CardContent>
            </Card>
          </Box>
        </div>
      )}
    </>
  );
};

export default PatientDetailsPage;