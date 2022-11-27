import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, RHFMultiSelect, RHFTextField } from '@/components/hook-form';
import {
  ALCOHOL_SEARCH,
  BODY_TYPE,
  EDUCATION_SEARCH,
  GENDER,
  GOALS,
  HOROSCOPE,
  KIDS_SEARCH,
  LANGUAGE_SEARCH,
  PERSONALITIES,
  SMOKE_SEARCH,
} from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectAccountData, updatePreferencesInfo } from '@/redux/slices/accountSlice';
import { UserPrefrences } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from 'notistack';

export default function Preferences() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);

  const emptyStringToNull = (value: any, originalValue: any) =>
    typeof originalValue === 'string' && originalValue === '' ? null : value;

  const UpdateUserSchema = Yup.object().shape({
    minAge: Yup.number().transform(emptyStringToNull).nullable(true).min(18, 'Vismaz 18 gadi'),
    maxAge: Yup.number()
      .transform(emptyStringToNull)
      .nullable(true)
      .moreThan(Yup.ref('minAge'), 'Jābūt lielākam par "Vecums no"'),
    minLength: Yup.number().transform(emptyStringToNull).nullable(true),
    maxLength: Yup.number()
      .transform(emptyStringToNull)
      .nullable(true)
      .moreThan(Yup.ref('minLength'), 'Jābūt lielākam par "Garums no"'),
  });

  const defaultValues: UserPrefrences = {
    minAge: account.search?.minAge ? account.search?.minAge : ('' as any),
    maxAge: account.search?.maxAge ? account.search?.maxAge : ('' as any),
    minLength: account.search?.minLength ? account.search?.minLength : ('' as any),
    maxLength: account.search?.maxLength ? account.search?.maxLength : ('' as any),
    body: account.search?.body ? account.search?.body : [],
    alcohol: account.search?.alcohol ? account.search?.alcohol : [],
    goals: account.search?.goals ? account.search?.goals : [],
    smoke: account.search?.smoke ? account.search?.smoke : [],
    about: account.search?.about ? account.search?.about : '',
    gender: account.search?.gender ? account.search?.gender : [],
    horoscope: account.search?.horoscope ? account.search?.horoscope : [],
    kids: account.search?.kids ? account.search?.kids : [],
    education: account.search?.education ? account.search?.education : [],
    sociotips: account.search?.sociotips ? account.search?.sociotips : [],
    language: account.search?.language ? account.search?.language : [],
  };

  const methods = useForm<UserPrefrences>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    // setValue,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, account.search]);

  const onSubmit: SubmitHandler<UserPrefrences> = (values) => {
    dispatch(updatePreferencesInfo(values, user?.id)).then(() =>
      enqueueSnackbar('Izmaiņas saglabātas!'),
    );
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Prasības otrai pusītei
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
                <RHFMultiSelect<UserPrefrences> name='gender' options={GENDER} label='Dzimums' />
                <RHFMultiSelect<UserPrefrences>
                  name='language'
                  options={LANGUAGE_SEARCH}
                  label='Saziņas valoda'
                />

                <Box>
                  <Stack direction='row' spacing={3}>
                    <RHFTextField<UserPrefrences> type='number' name='minAge' label='Vecums no' />
                    <RHFTextField<UserPrefrences> type='number' name='maxAge' label='līdz' />
                  </Stack>
                </Box>
                <Box>
                  <Stack direction='row' spacing={3}>
                    <RHFTextField<UserPrefrences>
                      type='number'
                      name='minLength'
                      label='Garums no'
                    />
                    <RHFTextField<UserPrefrences> type='number' name='maxLength' label='līdz' />
                  </Stack>
                </Box>

                <RHFMultiSelect<UserPrefrences>
                  name='body'
                  options={BODY_TYPE}
                  label='Ķermeņa uzbūve'
                />
                <RHFMultiSelect<UserPrefrences>
                  name='smoke'
                  options={SMOKE_SEARCH}
                  label='Smēķēšana'
                />
                <RHFMultiSelect<UserPrefrences>
                  name='alcohol'
                  options={ALCOHOL_SEARCH}
                  label='Alkohola patēriņš'
                />
                <RHFMultiSelect<UserPrefrences> name='kids' options={KIDS_SEARCH} label='Bērni' />
                <RHFMultiSelect<UserPrefrences>
                  name='sociotips'
                  options={PERSONALITIES}
                  label='Sociotips'
                />
                <RHFMultiSelect<UserPrefrences>
                  name='horoscope'
                  options={HOROSCOPE}
                  label='Horoskops'
                />
                <RHFMultiSelect<UserPrefrences>
                  name='education'
                  options={EDUCATION_SEARCH}
                  label='Izglītība'
                />
                <RHFMultiSelect<UserPrefrences>
                  name='goals'
                  options={GOALS}
                  label='Mērķis portālā'
                />
              </Box>

              <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
                <RHFTextField<UserPrefrences>
                  name='about'
                  multiline
                  rows={4}
                  label='Saviem vārdiem'
                />

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
