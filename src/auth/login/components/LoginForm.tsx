import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Alert, Button, Link, Stack } from '@mui/material';

type FormValues = {
  email: string;
  password: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Ievadiet derīgu e-pastu!').required('Lūdzu, ievadiet e-pastu!'),
  password: Yup.string().required('Lūdzu, ievadiet paroli!'),
});

function LoginForm() {
  const { login } = useAuth();

  const defaultValues: FormValues = {
    email: '',
    password: '',
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    login(values.email, values.password);
  };

  return (
    <FormProvider<FormValues> methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Alert variant='outlined' severity='error'>
          This is error!!!
        </Alert>

        <RHFTextField<FormValues> name='email' label='Email' />
        <RHFTextField<FormValues> name='password' label='Password' type='password' />
      </Stack>

      <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ my: 2 }}>
        <Link variant='subtitle2' href='/'>
          Aizmirsi paroli?
        </Link>
      </Stack>

      <Button fullWidth variant='contained' type='submit'>
        submit
      </Button>
    </FormProvider>
  );
}

export default LoginForm;
