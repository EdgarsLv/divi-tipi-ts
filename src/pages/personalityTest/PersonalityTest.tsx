import { Page } from '@/components';
import { Typography, Container, Stack, Card, Alert, Link } from '@mui/material';
import { TestForm } from './components';

function PersonalityTest() {
  return (
    <Page title='Sociotipa tests'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Tests Sociotipa noteikšanai
        </Typography>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Alert sx={{ width: '100%' }} variant='outlined' severity='info'>
                Pirms sāc pildīt testu!
              </Alert>
              <Typography color='text.secondary' sx={{ textAlign: 'justify' }} variant='body2'>
                Pildot testu bieži ir sajūta, ka Tevi raksturo gan viens, gan otrs apgalvojums, ka
                spēj rīkoties abējādi. Neraizējies, tā ir gandrīz katram, kas vēlas noskaidrot savu
                tipu. Lai izdotos tipu noskaidrot pēc iespējas ticamāk, Tev ir jābūt patiešām
                godīgam pret sevi. Padomā, kā rīkotos, ja uz Tevi neviens neskatītos, ja rīkotos, kā
                vēlies, nevis “kā vajag”.
              </Typography>
              <Typography color='text.secondary' variant='caption'>
                Ja nu tomēr saproti, ka savu īsto ES paša spēkiem atklāt ir grūti, neesi drošs par
                testa rezultātu, piesakies{' '}
                <Link
                  color='primary.main'
                  variant='caption'
                  underline='always'
                  href='https://cilvekutipi.lv/konsultacijas/'
                  target='_blank'
                  component='a'
                >
                  konsultācijai!
                </Link>
              </Typography>
            </Stack>
          </Card>
          <Card sx={{ p: 2 }}>
            <TestForm />
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}
export default PersonalityTest;
