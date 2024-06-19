import React, { useState, ChangeEvent } from 'react';
import { TableCell, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface EditableCellProps {
  value: string | number;
  onSave: (value: string | number) => void;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  isDropdown?: boolean;
  isEditable?: boolean; 

}

const EditableCell: React.FC<EditableCellProps> = ({ value, onSave, align = 'center', isDropdown,  isEditable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string | number>(value);
  const [discount, setDiscount] = useState("%");
  const handleDoubleClick = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(editValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEditValue(isNaN(Number(newValue)) ? newValue : Number(newValue));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setDiscount(event.target.value as string);
  };

  return (
    <TableCell
    align={align}
    onDoubleClick={handleDoubleClick}
    sx={{ border: '2px solid #dbdada', padding: '4px' }}
  >
    {isDropdown ? (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {isEditing && isEditable ? (
          <TextField
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            size="small"
            sx={{ width: '80%' }} // Adjust width as needed
          />
        ) : (
          <Typography sx={{ fontFamily: 'Josefin Sans', width: '80%' }}>{editValue}</Typography>
        )}
        <Select
          value={discount}
          onChange={handleSelectChange}
          size="small"
          sx={{ fontFamily: 'Josefin Sans', width: '25%',fontWeight:800, marginLeft: '4px',
            '.MuiOutlinedInput-notchedOutline': { border: 'none' }, 
            '.MuiSelect-select': { padding: '0' }
          }} // Adjust width and margin as needed
          disabled={!isEditable} // Disable if not editable
        >
          <MenuItem value={"%"}>%</MenuItem>
          <MenuItem value={"₹"}>₹</MenuItem>
        </Select>
      </div>
    ) : (
      (isEditing && isEditable) ? (
        <TextField
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          size="small"
          sx={{ fontFamily: 'Josefin Sans', width: '100%' }} // Adjust width as needed
        />
      ) : (
        <Typography style={{fontFamily: 'Josefin Sans'}}>{value}</Typography>
      )
    )}
  </TableCell>
  );
};

export default EditableCell;

