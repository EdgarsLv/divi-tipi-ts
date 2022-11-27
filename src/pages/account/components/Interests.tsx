import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Box,
  Grid,
  Card,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { INTERESTS } from '@/constants';
import { Iconify } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectAccountData, updateInterestsInfo } from '@/redux/slices/accountSlice';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from 'notistack';
import { UserInterests } from '@/types';

export default function Interests() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);

  const defaultValues: UserInterests = { interests: account.interests ? account.interests : [] };

  const methods = useForm<UserInterests>({
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, account.interests]);

  const onSubmit: SubmitHandler<UserInterests> = (values) => {
    dispatch(updateInterestsInfo(values, user?.id)).then(() =>
      enqueueSnackbar('Izmaiņas saglabātas!'),
    );
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Intereses
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component='fieldset' variant='standard'>
          <FormGroup>
            <Controller
              name='interests'
              control={control}
              render={({ field }) => (
                <Grid container spacing={3}>
                  {INTERESTS.map((option, i) => (
                    <Grid key={i} item xs={12} sm={4} md={3}>
                      <InterestsCard
                        checked={field.value.includes(option.name)}
                        key={i}
                        interest={option}
                      >
                        <FormControlLabel
                          labelPlacement='start'
                          label={''}
                          control={
                            <Checkbox
                              value={option.name}
                              checked={field.value.includes(option.name)}
                              onChange={(event, checked) => {
                                if (checked) {
                                  field.onChange([...field.value, event.target.value]);
                                } else {
                                  field.onChange(
                                    field.value.filter((value) => value !== event.target.value),
                                  );
                                }
                              }}
                            />
                          }
                        />
                      </InterestsCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            />
          </FormGroup>
        </FormControl>
        <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
          <Button disabled={!isDirty} type='submit' variant='contained'>
            Saglabāt izmaiņas
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

type CardProps = {
  interest: { icon: string; name: string };
  children: ReactNode;
  checked: boolean;
};

function InterestsCard({ interest, children, checked }: CardProps) {
  const { icon, name } = interest;

  return (
    <Card
      sx={{
        backgroundColor: `${checked ? 'action.selected' : ''}`,
        display: 'flex',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify icon={icon} sx={{ color: 'primary.main', width: 40, height: 40 }} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography
          sx={{ textTransform: 'capitalize', color: 'primary.main' }}
          variant='subtitle2'
          noWrap
        >
          {name}
        </Typography>
      </Box>
      {children}
    </Card>
  );
}
