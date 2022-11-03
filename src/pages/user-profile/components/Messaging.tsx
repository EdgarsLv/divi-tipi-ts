import { Box, Typography, Card, TextField, Button } from '@mui/material';

function Messaging() {
  return (
    <Box>
      <Typography variant='h3' sx={{ mt: 2, mb: 1 }}>
        Messaging
      </Typography>

      <Card sx={{ p: 3 }}>
        <TextField multiline fullWidth rows={4} placeholder='Rakstīt ziņu...' />

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}></Box>

          <Button variant='contained'>Sūtīt ziņu</Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Messaging;
