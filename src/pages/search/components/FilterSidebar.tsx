import { useState } from 'react';
import { Iconify } from '@/components';
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography } from '@mui/material';
import { FormProvider, RHFMultiCheckbox, RHFSelect } from '@/components/hook-form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDynamicMinMax } from '@/hooks';
import { PERSONALITIES } from '@/constants';

type FormValues = {
  minAge: number;
  maxAge: number;
  gender: string;
  sociotypes: string;
};

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const defaultValues: FormValues = {
    minAge: 18,
    maxAge: 99,
    gender: '',
    sociotypes: '',
  };
  const methods = useForm<FormValues>({
    defaultValues,
  });

  const { handleSubmit, watch } = methods;
  const values = watch();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  const { MIN, MAX } = useDynamicMinMax(values.minAge, values.maxAge);

  return (
    <>
      <Button
        variant='contained'
        size='small'
        color='inherit'
        endIcon={<Iconify icon='ic:round-filter-list' />}
        onClick={onOpen}
      >
        Filtrs
      </Button>

      <Drawer anchor='right' open={isOpen} onClose={onClose} PaperProps={{ sx: { width: 260 } }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ px: 1, py: 1 }}
        >
          <Typography variant='subtitle1' sx={{ ml: 1 }}>
            Filtrs
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill'} sx={{ width: '20px' }} />
          </IconButton>
        </Stack>

        <Divider />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant='subtitle1'>Dzimums</Typography>
              <RHFMultiCheckbox<FormValues> name='gender' options={['one', 'two', 'three']} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant='subtitle1'>Vecums</Typography>

              <Stack direction='row' spacing={1}>
                <RHFSelect<FormValues> name='minAge' label='No' size='small'>
                  {MIN.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect<FormValues> name='maxAge' label='Līdz' size='small'>
                  {MAX.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant='subtitle1'>Sociotips</Typography>
              <RHFMultiCheckbox<FormValues> name='sociotypes' options={PERSONALITIES} />
            </Stack>
          </Stack>
          <Button type='submit'>submit</Button>
        </FormProvider>
        <Divider />
        <Box sx={{ p: 3 }} />
      </Drawer>
    </>
  );
}
