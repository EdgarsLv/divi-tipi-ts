import { useState } from 'react';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { Iconify } from '@/components';
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography } from '@mui/material';
import { FormProvider, RHFMultiCheckbox, RHFSelect } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { useDynamicMinMax } from '@/hooks';
import { PERSONALITIES } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectFilters, setFilters } from '@/redux/slices/usersSlice';
import { FilterForm } from '@/types';

declare type SetURLSearchParams = (
  nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions,
) => void;

export default function FilterSidebar({ setParams }: { setParams: SetURLSearchParams }) {
  const { minAge, maxAge, gender, sociotypes } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // prettier-ignore
  const defaultValues: FilterForm = {
    minAge, maxAge, gender, sociotypes,
  };

  const methods = useForm<FilterForm>({
    defaultValues,
  });

  const { watch } = methods;
  const values = watch();

  const { MIN, MAX } = useDynamicMinMax(values.minAge, values.maxAge);

  const onClose = () => {
    setParams({ page: '1' });
    dispatch(setFilters(values));
    setIsOpen(false);
  };

  return (
    <>
      <Button
        sx={{ zIndex: 10 }}
        variant='contained'
        size='small'
        color='inherit'
        endIcon={<Iconify icon='ic:round-filter-list' />}
        onClick={() => setIsOpen(true)}
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
        <FormProvider methods={methods}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant='subtitle1'>Dzimums</Typography>
              <RHFMultiCheckbox<FilterForm> name='gender' options={['vīrietis', 'sieviete']} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant='subtitle1'>Vecums</Typography>

              <Stack direction='row' spacing={1}>
                <RHFSelect<FilterForm> name='minAge' label='No' size='small'>
                  {MIN.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect<FilterForm> name='maxAge' label='Līdz' size='small'>
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
              <RHFMultiCheckbox<FilterForm> name='sociotypes' options={PERSONALITIES} />
            </Stack>
          </Stack>
        </FormProvider>
        <Divider />
        <Box sx={{ p: 3 }} />
      </Drawer>
    </>
  );
}
