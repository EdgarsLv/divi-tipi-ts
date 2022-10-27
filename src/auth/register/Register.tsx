import { Link, Typography } from '@mui/material';
import { Page } from '../../components';

function Register() {
  return (
    <Page title='Register'>
      <Typography variant='h3'>Register</Typography>
      <Link href='/login'>to login</Link>
    </Page>
  );
}

export default Register;
