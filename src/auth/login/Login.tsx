import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, Typography, Button, TextField, Stack, Container } from '@mui/material';
import { Page } from '../../components';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    login(email, password);
  };

  return (
    <Page title='Login'>
      <Container maxWidth='lg'>
        <Typography variant='h3' mb={3}>
          login
        </Typography>
        <Stack>
          <TextField value={email} label='email' onChange={(e) => setEmail(e.target.value)} />

          <TextField
            sx={{ my: 3 }}
            value={password}
            label='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant='contained' onClick={handleLogin}>
            login
          </Button>
        </Stack>
        <Link href='/register'>to register</Link>
      </Container>
    </Page>
  );
}

export default Login;
