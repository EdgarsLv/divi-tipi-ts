import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RHFTextField, FormProvider } from '@/components/hook-form';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { supabase } from '@/service';
import { Privacy, Terms } from '@/components';
import { SocialButtons } from '@/auth/components';

type FormValues = {
  email: string;
  password: string;
};

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Ievadiet derīgu e-pastu').required('Lūdzu, ievadiet e-pastu'),
  password: Yup.string().required('Lūdzu, ievadiet paroli').min(6, 'Vismaz 6 simboli'),
});

function RegisterForm() {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const defaultValues: FormValues = {
    email: '',
    password: '',
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { data, error } = await register(values.email, values.password);

      if (data) {
        const content = {
          id: data.user?.id,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await supabase.from('users').upsert(content);
      }

      if (error) {
        throw new Error('Lietotājs ar šādu e-pastu jau reģistrēts!');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Stack sx={{ maxWidth: 320 }}>
      <SocialButtons title='Reģistrēties' />

      <FormProvider<FormValues> methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {error && (
            <Alert variant='outlined' severity='error'>
              {error}
            </Alert>
          )}

          <RHFTextField<FormValues> size='small' name='email' label='Epasts' />
          <RHFTextField<FormValues> size='small' name='password' label='Parole' type='password' />

          <Button variant='contained' fullWidth type='submit'>
            Reģistrēties
          </Button>
        </Stack>
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

export default RegisterForm;
