import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RHFTextField, FormProvider, RHFSelect } from '@/components/hook-form';
import { Alert, Button, Stack } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { range } from '@/utils/createNumberRange';
import { supabase } from '@/service';

type FormValues = {
  name: string;
  gender: string;
  age: string;
  email: string;
  password: string;
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Lūdzu, ievadiet vārdu')
    .min(3, 'Vismaz 3 simboli')
    .max(15, 'Maksimums 15 simboli')
    .trim(),
  gender: Yup.string().required('Lūdzu, norādiet dzimumu'),
  age: Yup.number().required('Lūdzu, norādiet vecumu').typeError('Lūdzu, norādiet vecumu'),
  email: Yup.string().email('Ievadiet derīgu e-pastu').required('Lūdzu, ievadiet e-pastu'),
  password: Yup.string().required('Lūdzu, ievadiet paroli').min(6, 'Vismaz 6 simboli'),
});

function RegisterForm() {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const defaultValues: FormValues = {
    name: '',
    gender: '',
    age: '',
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
      const { data, error } = await register(values);

      if (data) {
        const content = {
          id: data.user?.id,
          name: values.name,
          age: values.age.toString(),
          gender: values.gender,
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
    <FormProvider<FormValues> methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {error && (
          <Alert variant='outlined' severity='error'>
            {error}
          </Alert>
        )}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField<FormValues> name='name' label='Vārds' />
          <RHFSelect<FormValues> name='age' label='Vecums'>
            <option value='' />
            {range(18, 100).map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <RHFSelect<FormValues> name='gender' label='Dzimums'>
          <option value='' />
          {['vīrietis', 'sieviete'].map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>
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
