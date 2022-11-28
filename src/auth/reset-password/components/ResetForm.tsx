import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, Stack, Button } from '@mui/material';
import { supabase } from '@/service';
import { FormProvider, RHFTextField } from '@/components/hook-form';

type Reset = {
  onSent: any;
  onGetEmail: any;
};
type FormValues = {
  email: string;
};

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Lūdzu, ievadiet derīgu e-pastu!').required('Lūdzu, norādiet e-pastu!'),
});

function ResetForm({ onSent, onGetEmail }: Reset) {
  const isMounted = useRef(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(value.email);

      if (data) {
        if (isMounted.current) {
          onSent();
          onGetEmail(value.email);
        }
      }

      if (error) {
        throw new Error(`Lietotājs ar e-pastu ${value.email} nav atrasts`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {error && (
          <Alert variant='outlined' severity='error'>
            {error}
          </Alert>
        )}
        <RHFTextField<FormValues> name='email' label='E-pasts' />

        <Button fullWidth size='large' type='submit' variant='contained'>
          Nosūtīt
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default ResetForm;
