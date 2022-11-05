import { ReactNode } from 'react';
import { useFormContext, Controller, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  children: ReactNode;
} & TextFieldProps;

const RHFSelect = <TFormValues extends Record<string, unknown>>({
  name,
  children,
  ...other
}: IFormInputProps<TFormValues>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default RHFSelect;
