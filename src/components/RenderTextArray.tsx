import { FunctionComponent } from 'react';
import { Stack, Typography } from '@mui/material';

export const RenderTextArray: FunctionComponent<{ items: string[] | null }> = ({ items }) => (
  <Stack spacing={3}>
    {items?.map((item, index) => (
      <Typography variant='body2' sx={{ textAlign: 'justify' }} key={`item-${index}`}>
        {item}
      </Typography>
    ))}
  </Stack>
);
