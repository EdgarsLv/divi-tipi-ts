import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, AlertTitle, Box, Button, Paper, Stack } from '@mui/material';
import { FormProvider, RHFSelect, RHFTextField } from './hook-form';
import { range } from '@/utils/createNumberRange';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@/redux/store';
import { useAuth } from '@/contexts/AuthContext';
import { MetaInfo } from '@/types';
import { updateMetaInfo } from '@/redux/slices/accountSlice';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Lūdzu, ievadiet vārdu')
    .min(3, 'Vismaz 3 simboli')
    .max(15, 'Maksimums 15 simboli')
    .trim(),
  gender: Yup.string().required('Lūdzu, norādiet dzimumu'),
  age: Yup.number()
    .required('Lūdzu, norādiet vecumu')
    .min(18, 'Jābūt vismaz 18 gadiem')
    .max(99, 'Tiešām tik vecs?')
    .typeError('Lūdzu, norādiet vecumu'),
});

function RequireMetaAlert() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const defaultValues: MetaInfo = {
    name: '',
    age: '',
    gender: '',
  };
  const methods = useForm<MetaInfo>({
    mode: 'all',
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<MetaInfo> = (values) => {
    dispatch(updateMetaInfo(values, user?.id)).then(() =>
      enqueueSnackbar('Paldies, izmaiņas saglabātas!'),
    );
  };

  return (
    <Paper sx={{ p: 2, mt: 3, justifyContent: 'center', display: 'flex' }}>
      <Box>
        <Alert severity='info' variant='outlined' sx={{ mb: 3 }}>
          <AlertTitle>Svarīga informācija</AlertTitle>
          Šī ir obligāta pamatinformācija, lai visi lietotāji varētu pilvertīgi izmantot portālu.
        </Alert>
        <FormProvider<MetaInfo> methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField<MetaInfo> name='name' label='Vārds' />
            <RHFSelect<MetaInfo> name='age' label='Vecums' placeholder='vecums'>
              <option value='' />
              {range(18, 100).map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>
          </Stack>
          <Box sx={{ mt: 3 }}>
            <RHFSelect<MetaInfo> name='gender' label='Dzimums' placeholder='dzimums'>
              <option value='' />
              {['vīrietis', 'sieviete'].map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>
          </Box>

          <Button sx={{ mt: 3 }} fullWidth variant='contained' type='submit'>
            Saglabāt
          </Button>
        </FormProvider>
      </Box>
    </Paper>
  );
}

export default RequireMetaAlert;
