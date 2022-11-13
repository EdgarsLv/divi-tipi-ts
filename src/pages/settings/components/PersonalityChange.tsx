import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Stack, Card, Typography, Alert, TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/service';
import { FormProvider, RHFSelect } from '@/components/hook-form';
import { PERSONALITIES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@/redux/store';
import { updatePersonality } from '@/redux/slices/accountSlice';

type FormValues = {
  sociotype: string;
};
type Code = {
  code: string | null;
} | null;

export default function PersonalityChange() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<Code | null>();
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    const getCode = async () => {
      try {
        const { data, error } = await supabase.from('codes').select('code').maybeSingle();

        setCode(data);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCode();
  }, []);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserCode(e.target.value);
  };

  const UpdateUserSchema = Yup.object().shape({
    sociotype: Yup.string().required('Lūdzu, norādiet sociotipu'),
  });

  const defaultValues: FormValues = {
    sociotype: '',
  };
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(updatePersonality(values, user?.id)).then(() =>
      enqueueSnackbar(`Sociotips nomainīts! ${values.sociotype}`),
    );

    setCode({ code: 'randomcode' });
    setUserCode('');
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        Mainīt sociotipu
      </Typography>

      <Alert sx={{ width: '100%' }} variant='outlined' severity='info'>
        Ja zini savu sociotipu! Izvēlies atbilstošo sociotipu un ievadi kodu un spied - saglabāt.
      </Alert>
      <Stack direction='row' spacing={3} sx={{ mt: 3 }}>
        <TextField
          autoComplete='off'
          value={userCode}
          fullWidth
          size='small'
          label='Kods'
          name='userCode'
          onChange={(e) => handleUserInput(e)}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFSelect<FormValues>
            sx={{ minWidth: '150px' }}
            fullWidth
            size='small'
            name='sociotype'
            label='Sociotips'
            placeholder='sociotips'
          >
            <option value='' />
            {PERSONALITIES.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            disabled={code?.code !== userCode}
            type='submit'
            variant='contained'
          >
            Saglabāt
          </Button>
        </FormProvider>
      </Stack>
    </Card>
  );
}
