import { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { Iconify } from '@/components';
import Exercise from './Exercise';
import { useCountdown } from '@/hooks';
import Timer from './Timer';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { updateIQValue } from '@/redux/slices/accountSlice';

function Stepper() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [values, setValues] = useState<number[]>(new Array(35).fill(0));

  const d1 = new Date();
  const d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + 25);
  const { countdown, expired } = useCountdown(new Date(d2));

  const maxSteps = 35;

  const handleNext = () => {
    if (activeStep !== maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === maxSteps - 1) {
      const endResult = values.reduce((a, b) => a + b, 70);

      dispatch(updateIQValue(endResult, user?.id)).then(() => navigate('/iq-test-result'));
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: 'fit-content' }}>
      <Timer countdown={countdown} expired={expired} values={values} />
      <Box sx={{ mb: 1 }}>
        <Exercise values={values} handleNext={handleNext} setValues={setValues} step={activeStep} />
      </Box>
      <MobileStepper
        variant='text'
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button variant='outlined' size='small' onClick={handleNext}>
            {activeStep === maxSteps - 1 ? 'Rezultāts' : 'Nākamais'}
            <Iconify icon='eva:arrow-ios-forward-fill' />
          </Button>
        }
        backButton={
          <Button variant='outlined' size='small' onClick={handleBack} disabled={activeStep === 0}>
            <Iconify icon='eva:arrow-ios-back-fill' />
            Atpakaļ
          </Button>
        }
      />
    </Box>
  );
}

export default Stepper;
