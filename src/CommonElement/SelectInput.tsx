import React from 'react';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormHelperText from '@mui/material/FormHelperText';


const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: '#105e63',
    fontSize: '0.875rem', // Smaller font size
    marginBottom: theme.spacing(0.5),
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#b3f5ce',
      borderRadius: '0px', // Remove the border radius
    },
    '&:hover fieldset': {
      borderColor: '#105e63',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#105e63',
    },
    '&.Mui-error fieldset': {
      borderColor: '#d32f2f', // Change to error color
    },
    height: '28px', // Reduced height
  },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

const CustomSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: theme.spacing(1), // Smaller padding
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#cafade',
    display: 'flex',
    alignItems: 'center',
    height: '28px', // Reduced height
    paddingRight: '30px', // Make space for the icon
  },
  '& .MuiSelect-icon': {
    color: '#fff',
    backgroundColor: '#105e63',
    borderRadius: '0',
    height: '28px', // Set the icon height to match the input height
    width: '30px',
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // Ensure the icon doesn't interfere with click events
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.80rem', // Smaller font size for menu items
}));

const customMenuProps = {
  PaperProps: {
    style: {
      marginTop: '0px', // Remove the top margin
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

interface CustomSelectProps extends Omit<SelectProps, 'label'> {
  options: { value: string | number; label: string }[];
  error?: boolean;
  helperText?: string;
}

const SelectInput: React.FC<CustomSelectProps> = ({ options,  error, helperText, ...props }) => {

  
  return (
    <CustomFormControl fullWidth variant="outlined" error={error}>
      <CustomSelect
        {...props}
        IconComponent={ArrowDropDownIcon}
        MenuProps={customMenuProps as any}
      >
        {options.map((option) => (
          <CustomMenuItem key={option.value} value={option.value}>
            {option.label}
          </CustomMenuItem>
        ))}
      </CustomSelect>
       {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </CustomFormControl>
  );
};

export default SelectInput;
