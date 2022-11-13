import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Card, Typography, Button } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { supabase } from '@/service';
import { useSnackbar } from 'notistack';

type FormValues = {
  newEmail: string;
};
export default function EmailChange() {
  const { enqueueSnackbar } = useSnackbar();
  const ChangeEmailSchema = Yup.object().shape({
    newEmail: Yup.string().email('Ievadiet derīgu e-pastu!').required('Lūdzu, ievadiet e-pastu!'),
  });

  const defaultValues: FormValues = {
    newEmail: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangeEmailSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { error } = await supabase.auth.updateUser({ email: values.newEmail });

      reset();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      enqueueSnackbar('Epats nomainīts!');
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        Mainīt e-pastu
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems='flex-end'>
          <RHFTextField<FormValues>
            size='small'
            name='newEmail'
            type='email'
            label='Jaunais e-pasts'
          />

          <Button type='submit' variant='contained'>
            Saglabāt izmaiņas
          </Button>
        </Stack>
      </FormProvider>
    </Card>
  );
}
