import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Alert, Button, Link, Stack, Typography } from '@mui/material';
import { Privacy, Terms } from '@/components';
import { SocialButtons } from '@/auth/components';

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
  const [error, setError] = useState<string | null>(null);

  const defaultValues: FormValues = {
    email: '',
    password: '',
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { error } = await login(values.email, values.password);

      if (error) {
        throw new Error('Nepareizs e-pasts un/vai parole!');
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Stack sx={{ maxWidth: 320 }}>
      <SocialButtons title='Ienākt' />

      <FormProvider<FormValues> methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {error && (
            <Alert severity='error' variant='outlined'>
              {error}
            </Alert>
          )}

          <RHFTextField<FormValues> size='small' name='email' label='Epasts' />
          <RHFTextField<FormValues> size='small' name='password' label='Parole' type='password' />
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ my: 2 }}>
          <Link variant='subtitle2' href='/reset-password'>
            Aizmirsi paroli?
          </Link>
        </Stack>

        <Button fullWidth variant='contained' type='submit'>
          Ienākt
        </Button>
      </FormProvider>

      <Typography variant='caption' align='center' sx={{ color: 'text.secondary', mt: 1 }}>
        Reģistrējoties es piekrītu&nbsp;
        <Terms />
        un
        <Privacy />
      </Typography>
    </Stack>
  );
}

export default LoginForm;
