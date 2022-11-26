import { Alert, AlertTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RequireAvatarAlert() {
  const navigate = useNavigate();

  return (
    <Alert sx={{ mt: 3 }} variant='outlined' severity='info'>
      <AlertTitle>Profila bilde</AlertTitle>
      Lai redzētu citu lietotāju profilus ir jāpievieno profila bilde!
      <Button
        sx={{ ml: 1 }}
        onClick={() => navigate('/account')}
        size='small'
        color='info'
        variant='contained'
      >
        Uz anketu
      </Button>
    </Alert>
  );
}

export default RequireAvatarAlert;
