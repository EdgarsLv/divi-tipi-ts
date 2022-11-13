import { FormProvider, RHFRadioGroup } from '@/components/hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, Box, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { TEST_QUESTIONS } from '@/constants';
import { testResult } from '@/utils/testResult';
import { useAppDispatch } from '@/redux/store';
import { useAuth } from '@/contexts/AuthContext';
import { updatePersonality } from '@/redux/slices/accountSlice';
import { useSnackbar } from 'notistack';
import { PersonalityTestQuestions } from '@/types';

const UpdateTestSchema = Yup.object().shape({
  q1: Yup.string().required('Šī atbilde ir obligāta!'),
  q2: Yup.string().required('Šī atbilde ir obligāta!'),
  q3: Yup.string().required('Šī atbilde ir obligāta!'),
  q4: Yup.string().required('Šī atbilde ir obligāta!'),
  q5: Yup.string().required('Šī atbilde ir obligāta!'),
  q6: Yup.string().required('Šī atbilde ir obligāta!'),
  q7: Yup.string().required('Šī atbilde ir obligāta!'),
  q8: Yup.string().required('Šī atbilde ir obligāta!'),
  q9: Yup.string().required('Šī atbilde ir obligāta!'),
  q10: Yup.string().required('Šī atbilde ir obligāta!'),
  q12: Yup.string().required('Šī atbilde ir obligāta!'),
  q14: Yup.string().required('Šī atbilde ir obligāta!'),
  q15: Yup.string().required('Šī atbilde ir obligāta!'),
  q16: Yup.string().required('Šī atbilde ir obligāta!'),
  q17: Yup.string().required('Šī atbilde ir obligāta!'),
  q18: Yup.string().required('Šī atbilde ir obligāta!'),
  q19: Yup.string().required('Šī atbilde ir obligāta!'),
  q20: Yup.string().required('Šī atbilde ir obligāta!'),
  q21: Yup.string().required('Šī atbilde ir obligāta!'),
  q22: Yup.string().required('Šī atbilde ir obligāta!'),
});

const NumberStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 30,
}));

function TestForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  // prettier-ignore
  const defaultValues: PersonalityTestQuestions = {
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q12: '',
    q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '', q21: '', q22: '',
  };

  const methods = useForm<PersonalityTestQuestions>({
    resolver: yupResolver(UpdateTestSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isDirty, errors },
  } = methods;

  const onSubmit: SubmitHandler<PersonalityTestQuestions> = (values) => {
    const sociotype = testResult(values);
    dispatch(updatePersonality({ sociotype }, user?.id)).then(() =>
      enqueueSnackbar(`Sociotips noteikts: ${sociotype.toUpperCase()}`),
    );
  };

  const opt = [1, 2];
  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
      {TEST_QUESTIONS.map(({ question, type }, i) => (
        <Stack key={i} direction='row'>
          <NumberStyle>
            <Typography pr={2}>{i + 1}</Typography>
          </NumberStyle>
          <RHFRadioGroup key={i} name={question} options={opt} label={type} row={false} />
        </Stack>
      ))}

      <Stack sx={{ mt: 1 }}>
        {Object.keys(errors).length > 0 && (
          <Typography textAlign='center' color='error' variant='caption' component='span'>
            Visas atbildes obligātas!
          </Typography>
        )}
        <Button disabled={!isDirty} type='submit'>
          Noteikt tipu
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default TestForm;
