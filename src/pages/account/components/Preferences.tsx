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

type FormValues = {
  minAge: number;
  maxAge: number;
  minLength: number;
  maxLength: number;
  body: string[];
  alcohol: string[];
  goals: string[];
  smoke: string[];
  about: string;
  gender: string[];
  horoscope: string[];
  kids: string[];
  education: string[];
  sociotips: string[];
  language: string[];
};

export default function Preferences() {
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

  const defaultValues: FormValues = {
    minAge: 18,
    maxAge: 99,
    minLength: 160,
    maxLength: 170,
    body: [],
    alcohol: [],
    goals: [],
    smoke: [],
    about: '',
    gender: [],
    horoscope: [],
    kids: [],
    education: [],
    sociotips: [],
    language: [],
  };

  const methods = useForm({
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
  }, [reset]);
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };
  // const onSubmit = async (values) => {
  //   await supabase
  //     .from('users')
  //     .update({ search: { ...values } })
  //     .match({ id: user.userId })
  //     .then(({ error }) => {
  //       if (error) {
  //         throw new Error('Kļūme');
  //       }
  //       enqueueSnackbar('Izmaiņas saglabātas!');
  //     })
  //     .catch(({ message }) => {
  //       enqueueSnackbar(message, { variant: 'error' });
  //     })
  //     .finally(() => {
  //       dispatch(getUserProfile(user.userId));
  //     });
  // };

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
                <RHFMultiSelect<FormValues> name='gender' options={GENDER} label='Dzimums' />
                <RHFMultiSelect<FormValues>
                  name='language'
                  options={LANGUAGE_SEARCH}
                  label='Saziņas valoda'
                />

                <Box>
                  <Stack direction='row' spacing={3}>
                    <RHFTextField<FormValues> type='number' name='minAge' label='Vecums no' />
                    <RHFTextField<FormValues> type='number' name='maxAge' label='līdz' />
                  </Stack>
                </Box>
                <Box>
                  <Stack direction='row' spacing={3}>
                    <RHFTextField<FormValues> type='number' name='minLength' label='Garums no' />
                    <RHFTextField<FormValues> type='number' name='maxLength' label='līdz' />
                  </Stack>
                </Box>

                <RHFMultiSelect<FormValues>
                  name='body'
                  options={BODY_TYPE}
                  label='Ķermeņa uzbūve'
                />
                <RHFMultiSelect<FormValues> name='smoke' options={SMOKE_SEARCH} label='Smēķēšana' />
                <RHFMultiSelect<FormValues>
                  name='alcohol'
                  options={ALCOHOL_SEARCH}
                  label='Alkohola patēriņš'
                />
                <RHFMultiSelect<FormValues> name='kids' options={KIDS_SEARCH} label='Bērni' />
                <RHFMultiSelect<FormValues>
                  name='sociotips'
                  options={PERSONALITIES}
                  label='Sociotips'
                />
                <RHFMultiSelect<FormValues>
                  name='horoscope'
                  options={HOROSCOPE}
                  label='Horoskops'
                />
                <RHFMultiSelect<FormValues>
                  name='education'
                  options={EDUCATION_SEARCH}
                  label='Izglītība'
                />
                <RHFMultiSelect<FormValues> name='goals' options={GOALS} label='Mērķis portālā' />
              </Box>

              <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
                <RHFTextField<FormValues> name='about' multiline rows={4} label='Saviem vārdiem' />

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
