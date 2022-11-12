import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, RHFMultiSelect, RHFSelect, RHFTextField } from '@/components/hook-form';
import { ALCOHOL, BODY_TYPE, EDUCATION, GENDER, GOALS, HOROSCOPE, KIDS, SMOKE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectAccountData, updateGeneralInfo } from '@/redux/slices/accountSlice';
import { UserInfo } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from 'notistack';

function General() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Lūdzu, norādiet vārdu')
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

  const defaultValues: UserInfo = {
    name: account.user.name,
    city: account.user.city,
    age: account.user.age,
    length: account.user.length,
    body: account.user.body,
    alcohol: account.user.alcohol,
    goals: account.user.goals,
    smoke: account.user.smoke,
    about: account.user.about,
    gender: account.user.gender,
    horoscope: account.user.horoscope,
    kids: account.user.kids,
    education: account.user.education,
    sociotips: account.user.sociotips,
  };

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, account.user]);

  const onSubmit: SubmitHandler<UserInfo> = async (values) => {
    dispatch(updateGeneralInfo(values, user?.id)).finally(() =>
      enqueueSnackbar('Izmaiņas saglabātas!'),
    );
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Par mani
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField<UserInfo> name='name' label='Vārds' />
                <RHFSelect<UserInfo> name='gender' label='Dzimums' placeholder='dzimums'>
                  <option value='' />
                  {GENDER.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField<UserInfo> name='city' label='Pilsēta' />

                <RHFTextField<UserInfo> type='number' name='age' label='Vecums' />
                <RHFTextField<UserInfo> type='number' name='length' label='Garums' />
                <RHFSelect<UserInfo>
                  name='body'
                  label='Ķermeņa uzbūve'
                  placeholder='ķermeņa uzbūve'
                >
                  <option value='' />
                  {BODY_TYPE.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSelect<UserInfo> name='education' label='Izglītība' placeholder='izglītība'>
                  <option value='' />
                  {EDUCATION.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect<UserInfo> name='horoscope' label='Horoskops' placeholder='horoskops'>
                  <option value='' />
                  {HOROSCOPE.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect<UserInfo> name='smoke' label='Smēķēšana' placeholder='smēķēšana'>
                  <option value='' />
                  {SMOKE.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSelect<UserInfo>
                  name='alcohol'
                  label='Alkohola patēriņš'
                  placeholder='alkohola patēriņš'
                >
                  <option value='' />
                  {ALCOHOL.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect<UserInfo> name='kids' label='Bērni' placeholder='bērni'>
                  <option value='' />
                  {KIDS.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFMultiSelect<UserInfo> name='goals' options={GOALS} label='Mērķis portālā' />
              </Box>

              <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
                <RHFTextField<UserInfo> name='about' multiline rows={4} label='Saviem vārdiem' />

                <Button disabled={!isDirty} type='submit' variant='contained'>
                  Saglabāt izmaiņas
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

export default General;
