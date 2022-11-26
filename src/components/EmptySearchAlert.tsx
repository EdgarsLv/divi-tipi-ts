import { Alert, AlertTitle } from '@mui/material';

function EmptySearchAlert() {
  return (
    <Alert sx={{ mt: 3 }} variant='outlined' severity='info'>
      <AlertTitle>Pēc izvēlātajiem kritērijiem nekas netika atrasts!</AlertTitle>
      Izmantojiet filtru lai mainītu kritērijus!
    </Alert>
  );
}

export default EmptySearchAlert;
