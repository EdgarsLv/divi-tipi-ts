import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext, Path } from 'react-hook-form';

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
} & TextFieldProps;

const RHFTextField = <TFormValues extends Record<string, unknown>>({
  name,
  ...other
}: IFormInputProps<TFormValues>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...other}
          {...field}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
        />
      )}
    />
  );
};

export default RHFTextField;
