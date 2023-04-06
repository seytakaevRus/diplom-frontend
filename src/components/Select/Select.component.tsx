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
  isError?: boolean;
  errorMessage?: string;
  rules?: UseControllerProps['rules'];
  label: string;
  items: {
    id: number;
    title: string;
    slug: string;
  }[];
  fullWidth?: boolean;
}

export const Select = ({
  control,
  rules,
  name,
  isError,
  label,
  items,
  errorMessage,
  fullWidth,
}: SelectProps) => (
  <FormControl fullWidth={fullWidth} error={isError}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const menuItems = items.map(({ id, title, slug }) => (
          <MenuItem key={id} value={slug}>
            {title}
          </MenuItem>
        ));

        return (
          <>
            <NativeSelect {...field} label={label}>
              {menuItems}
            </NativeSelect>
            <FormHelperText>{errorMessage}</FormHelperText>
          </>
        );
      }}
    />
  </FormControl>
);
