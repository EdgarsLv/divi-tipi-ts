import { Alert, AlertTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RequireSociotypeAlert() {
  const navigate = useNavigate();

  return (
    <Alert sx={{ mt: 3 }} variant='outlined' severity='info'>
      <AlertTitle>Sociotips</AlertTitle>
      Lai pilvertīgi lietotu portālu ir jāaizpilda sociotipa noteikšanas tests!
      <Button
        sx={{ ml: 1 }}
        onClick={() => navigate('/personalities/test')}
        size='small'
        color='info'
      >
        UZ TESTU
      </Button>
    </Alert>
  );
}

export default RequireSociotypeAlert;
