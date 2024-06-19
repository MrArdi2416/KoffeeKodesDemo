import React, { useState, ChangeEvent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, IconButton, TextField, SelectChangeEvent, FormControlLabel, Checkbox, Button, Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

interface Row {
  id: number;
  value: string;
}
// interface RowData {
//   id: number;
//   item: string;
//   quantity: number;
//   unit: string;
//   rate: number;
//   tax: number;
//   cess: number;
//   discount: number;
//   amount: number;
//   remark: string;
// }

// const initialRows: RowData[] = [
//   {
//     id: 0,
//     item: 'Test',
//     quantity: 100,
//     unit: 'PIECES',
//     rate: 500,
//     tax: 12,
//     cess: 0,
//     discount: 5,
//     amount: 47500,
//     remark: 'remark',
//   },
//   {
//     id: 1,
//     item: 'Test',
//     quantity: 10,
//     unit: 'PIECES',
//     rate: 60,
//     tax: 12,
//     cess: 0,
//     discount: 50,
//     amount: 550,
//     remark: 'remark',
//   },
// ];



export const Account = () => {
  const [rows, setRows] = useState<Row[]>([]);
  // const [rows, setRows] = useState<RowData[]>(initialRows);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const options = ['Option 1', 'Option 2', 'Option 3']; // Replace with your options

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setRows([...rows, { id: rows.length, value }]);
  };

  const handleEditClick = (index: number) => {
    setEditRowIndex(index);
    setEditValue(rows[index].value);
  };

  const handleDeleteClick = (index: number) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleSaveClick = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].value = editValue;
    setRows(updatedRows);
    setEditRowIndex(null);
  };

  return (
    <div>

      <h1 className="text-3xl mb-4">Account</h1>
      <div>
        <h1 className="text-3xl mb-4">Account</h1>
        <div>
          <Select value={selectedOption} onChange={handleSelectChange}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Value</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {editRowIndex === index ? (
                        <TextField value={editValue} onChange={handleEditChange} />
                      ) : (
                        row.value
                      )}
                    </TableCell>
                    <TableCell>
                      {editRowIndex === index ? (
                        <IconButton onClick={() => handleSaveClick(index)}>
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditClick(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* <Box sx={{ padding: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ITEM</TableCell>
              <TableCell>QUANTITY</TableCell>
              <TableCell>RATE</TableCell>
              <TableCell>TAX (%)</TableCell>
              <TableCell>CESS (%)</TableCell>
              <TableCell>DISCOUNT (%)</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>REMARK</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>
                    {row.quantity} {row.unit}
                  </TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.tax}</TableCell>
                  <TableCell>{row.cess}</TableCell>
                  <TableCell>{row.discount}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.remark}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel control={<Checkbox />} label="Terms and Condition" />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Sub Total" fullWidth disabled value="48050.00" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Additional Charges" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Discount" fullWidth defaultValue="10" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Taxable Amount" fullWidth disabled value="43245.00" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="IGST" fullWidth disabled value="5458.86" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Cess Amount" fullWidth disabled value="0.00" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="RoundOff" fullWidth disabled value="0.00" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Total Amount" fullWidth disabled value="48703.86" />
          </Grid>
        </Grid>
      </Box>
      </Box> */}
      </div>

    </div>
  )
}
