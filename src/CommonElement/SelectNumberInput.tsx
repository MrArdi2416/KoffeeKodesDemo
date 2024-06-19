import React from 'react';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#000',
    borderColor: '#105e63',
    display: 'flex',
    alignItems: 'center',
    height: '28px', // Reduced height
    '& input': {
      padding: theme.spacing(1), // Smaller padding
    },
    '&:hover input': {
    },
    '& fieldset': {
      borderColor: '#cafade',
      borderRadius: '0px', // Remove the border radius
    },
    '&:hover fieldset': {
      borderColor: '#105e63',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#105e63',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#105e63',
    marginBottom: theme.spacing(0.5), // Adjusted margin bottom
    fontSize: '0.875rem', // Smaller font size
  },
}));

  
  interface CustomTextInputProps extends Omit<TextFieldProps, 'variant'> {
    label: string;
  }
  
const SelectNumberInput: React.FC<CustomTextInputProps> = ({ label,error, helperText,  ...props }) => {
  return (
    <CustomTextField
      {...props}
      label={label}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      error={error}
      helperText={helperText}

    />
  );
};


export default SelectNumberInput;
