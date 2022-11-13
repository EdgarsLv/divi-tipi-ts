import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Card, Typography, Button } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { supabase } from '@/service';
import { useSnackbar } from 'notistack';

type FormValues = {
  newPassword: string;
  confirmNewPassword: string;
};
export default function PasswordChange() {
  const { enqueueSnackbar } = useSnackbar();
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Parolei jābūt vismaz 6 simboliem')
      .required('Parole ir nepieciešama'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Parolēm ir jāsakrīt'),
  });

  const defaultValues: FormValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: values.newPassword });

      reset();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      enqueueSnackbar('Parole nomainīta!');
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        Mainīt paroli
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems='flex-end'>
          <RHFTextField<FormValues>
            size='small'
            name='newPassword'
            type='password'
            label='Jaunā parole'
          />
          <RHFTextField<FormValues>
            size='small'
            name='confirmNewPassword'
            type='password'
            label='Apstiprināt jauno paroli'
          />

          <Button type='submit' variant='contained'>
            Saglabāt izmaiņas
          </Button>
        </Stack>
      </FormProvider>
    </Card>
  );
}
