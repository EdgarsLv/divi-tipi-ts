import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RHFTextField, FormProvider } from '@/components/hook-form';
import { Alert, Button, Stack } from '@mui/material';

type FormValues = {
  email: string;
  password: string;
};

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Ievadiet derīgu e-pastu!').required('Lūdzu, ievadiet e-pastu!'),
  password: Yup.string().required('Lūdzu, ievadiet paroli!'),
});

function RegisterForm() {
  const defaultValues: FormValues = {
    email: '',
    password: '',
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  return (
    <FormProvider<FormValues> methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Alert variant='outlined' severity='error'>
          This is error!!!
        </Alert>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField<FormValues> name='email' label='Vārds' />
          <RHFTextField<FormValues> name='password' label='Vecums' />
        </Stack>

        <RHFTextField<FormValues> name='email' label='Dzimums' />
        <RHFTextField<FormValues> name='email' label='Email' />
        <RHFTextField<FormValues> name='password' label='Password' type='password' />

        <Button variant='contained' fullWidth type='submit'>
          submit
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default RegisterForm;
