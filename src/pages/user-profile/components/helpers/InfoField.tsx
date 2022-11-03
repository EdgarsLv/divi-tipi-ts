import { Stack, Typography } from '@mui/material';

type Props = {
  attribute: string;
  id: string;
};

export default function InfoField({ attribute, id }: Props) {
  const isValid = attribute && attribute.length > 0;
  return (
    <>
      {isValid && (
        <Stack direction='row' sx={{ ml: 2, mb: 1, textTransform: 'capitalize' }} spacing={2}>
          <Typography color='text.secondary' component='span'>
            {id}:
          </Typography>
          <Typography variant='subtitle1' component='span'>
            {attribute}
          </Typography>
        </Stack>
      )}
    </>
  );
}
