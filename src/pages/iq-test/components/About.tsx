import { Iconify } from '@/components';
import { useCountdown } from '@/hooks';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';

type Props = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

function About({ setStart }: Props) {
  // eslint-disable-next-line camelcase
  const { iq_completed_at } = useAppSelector(selectAccountData);

  const d1 = new Date(iq_completed_at);
  const d2 = new Date();
  d2.setTime(d1.getTime() + 5 * 86400 * 1000);
  const { countdown, expired } = useCountdown(new Date(d2));

  return (
    <Box>
      <Alert severity='info' variant='outlined'>
        <AlertTitle>Par testu</AlertTitle>

        <Typography textAlign='justify'>
          Šis tiešsaistes tests sniedz norādi par vispārējām kognitīvām spējām, ko attēlo IQ
          rezultāts no 70 līdz 150, kur 105 ir iedzīvotāju vidējais rādītājs. Šis tests neaizstāj
          profesionālā intelekta pārbaudi.
        </Typography>

        <Typography mt={2} textAlign='justify'>
          Tests sastāv no 35 uzdevumiem, kas jāatrisina 25 minūšu laikā. Visi uzdevumi sastāv no
          pilnīgi vizuāliem modeļiem ar progresīvām grūtības pakāpēm un tiem nav nepieciešamas
          īpašas zināšanas vai matemātiskās prasmes. Nav papildus punktu par ātru aizpildīšanu vai
          sodu par nepareizām atbildēm, tādēļ izmantojiet laiku atbildīgi un miniet, ja neesat
          pārliecināts.
        </Typography>
      </Alert>

      <Alert sx={{ mt: 2 }} severity='warning' variant='outlined'>
        <AlertTitle sx={{ mb: 1, alignItems: 'center', display: 'flex' }}>
          Pirms sāc pildīt testu pārliecinies, ka būs laiks to pabeigt!
        </AlertTitle>
        {expired ? (
          <Button
            startIcon={<Iconify icon='icon-park-outline:thinking-problem' />}
            variant='contained'
            onClick={() => setStart(true)}
          >
            Sākt testu
          </Button>
        ) : (
          <Typography>
            Atkārtoti testu varēs pildīt pēc:{' '}
            <Typography variant='subtitle1' component='span'>
              {countdown.days}:{countdown.hours}:{countdown.minutes}:{countdown.seconds}
            </Typography>
          </Typography>
        )}
      </Alert>
    </Box>
  );
}

export default About;
