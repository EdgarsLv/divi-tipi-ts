import { Stack, Typography } from '@mui/material';

type Props = {
  from?: number;
  to?: number;
  id: string;
};

export default function InfoFromToField({ from, to, id }: Props) {
  const valid = Boolean(from) || Boolean(to);

  return (
    <>
      {valid && (
        <Stack direction='row' sx={{ ml: 2, mb: 1, textTransform: 'capitalize' }} spacing={2}>
          <Typography color='text.secondary' component='span'>
            {id}:
          </Typography>
          {from && (
            <Typography variant='subtitle1' component='span'>
              <Typography
                sx={{ textTransform: 'lowercase' }}
                mr={1}
                variant='caption'
                color='text.secondary'
                component='span'
              >
                no
              </Typography>
              {from}
            </Typography>
          )}
          {to && (
            <Typography variant='subtitle1' component='span'>
              <Typography
                sx={{ textTransform: 'lowercase' }}
                mr={1}
                variant='caption'
                color='text.secondary'
                component='span'
              >
                līdz
              </Typography>
              {to}
            </Typography>
          )}
        </Stack>
      )}
    </>
  );
}
