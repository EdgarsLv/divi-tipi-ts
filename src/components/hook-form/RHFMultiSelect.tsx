import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from '@mui/material';
import { useFormContext, Controller, Path } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  options: string[];
  label: string;
};

const RHFMultiSelect = <TFormValues extends Record<string, unknown>>({
  name,
  options,
  label,
}: IFormInputProps<TFormValues>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[] as any}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            {...field}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option}>
                <Checkbox checked={field.value.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default RHFMultiSelect;
