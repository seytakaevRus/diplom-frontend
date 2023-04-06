import React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';
import {
    FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as NativeSelect,
} from '@mui/material';

interface SelectProps {
  name: string;
  control: Control<any, any>;
  isError: boolean;
  errorMessage: string | undefined;
  rules: UseControllerProps['rules'];
  label: string;
  items: {
    id: number;
    title: string;
  }[]

}

export const Select = ({ control, rules, name, isError, label, items, errorMessage }: SelectProps) => (
  <FormControl fullWidth error={isError}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <NativeSelect {...field} label={label}>
            {items.map(({ id, title }) => (
              <MenuItem key={id} value={title}>
                {title}
              </MenuItem>
            ))}
          </NativeSelect>
          <FormHelperText>{errorMessage}</FormHelperText>
        </>
      )}
    />
  </FormControl>
);
