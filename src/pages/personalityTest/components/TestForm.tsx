import { FormProvider, RHFRadioGroup } from '@/components/hook-form';
import { Stack, Typography, Box } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { TEST_QUESTIONS } from '@/constants';

type FormValues = {
  city: string;
  email: string;
};

const NumberStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
}));

function TestForm() {
  const methods = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  const opt = [1, 2];
  return (
    <FormProvider onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
      {TEST_QUESTIONS.map((x, i) => (
        <Stack key={i} direction='row'>
          <NumberStyle>
            <Typography>{i + 1}</Typography>
          </NumberStyle>
          <RHFRadioGroup
            key={i}
            name={x.question}
            options={opt}
            getOptionLabel={x.type}
            row={false}
          />
        </Stack>
      ))}

      <input type='submit' />
    </FormProvider>
  );
}

export default TestForm;
