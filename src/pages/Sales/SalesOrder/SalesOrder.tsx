import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Typography, Breadcrumbs, Stack, Button, Grid, SelectChangeEvent,
  Box, Checkbox, Divider, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField,
  MenuItem,
  Select
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import SelectInput from '../../../CommonElement/SelectInput';
import SelectNumberInput from '../../../CommonElement/SelectNumberInput';
import { billToOptions, itemOptions, ledgerOptions, orderTypeOptions, shipToOptions, transportModeOptions, transportOptions, voucherTypeOptions, warehouseOptions } from './options';
import EditableCell from '../../../CommonElement/EditableCell';

interface Item {
  item: string;
  quantity: number;
  unit: string;
  rate: number;
  tax: number;
  cess: number;
  discount: number;
  discountType: '%' | '₹';
  amount: number;
  remark: string;
}

interface SalesOrderDetails {
  orderType: string;
  voucherType: string;
  orderNumber: string;
  orderDate: Date | string;
  ledger: string;
  dueDays: string;
  billTo: string;
  shipTo: string;
  transport: number;
  transportMode: string;
  wareHouse: string;
  vehicleNumber: string;
  lrNo: string;
  lrDate: Date | string;
}


const SalesOrder = () => {

  const [salesOrderDetails, setSalesOrderDetails] = useState<SalesOrderDetails>({
    orderType: '',
    voucherType: '',
    orderNumber: '',
    orderDate: new Date(),
    ledger: '',
    dueDays: '',
    billTo: '',
    shipTo: '',
    transport: 0,
    transportMode: '',
    wareHouse: '',
    vehicleNumber: '',
    lrNo: '',
    lrDate: new Date(),
  });
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [taxableAmount, setTaxableAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);

  const [igst, setIgst] = useState<number>(0);
  const [cess, setCess] = useState<number>(0);

  const [roundOff, setRoundOff] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  const [discountType, setDiscountType] = useState<'%' | '₹'>('%');
  const [additionalDiscountValue, setAdditionalDiscountValue] = useState<number>(0);

  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});



  const handleDiscountTypeChange = (event: SelectChangeEvent<'%' | '₹'>) => {
    setDiscountType(event.target.value as '%' | '₹');
  };

  const handleDiscountValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAdditionalDiscountValue(value === '' ? 0 : parseFloat(value));
  };

  const handleAddItemSelectChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string || Date;
    setSelectedOption(value);

    const selectedItem = itemOptions.find(option => option.value === value);
    if (selectedItem) {
      setItems([...items, {
        item: selectedItem.label,
        quantity: 1,
        unit: 'pcs',
        rate: 100.00,
        tax: 12,
        cess: 0,
        discount: 0,
        discountType: '%',
        amount: 100.00,
        remark: ''
      }]);
    }
  }

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCellSave = <K extends keyof Item>(index: number, field: K, value: Item[K]) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const updatedItem = updatedItems[index];
    const amount = updatedItem.quantity * updatedItem.rate;

    console.log('Discount:', updatedItem.discount);
    console.log('Discount Type:', updatedItem.discountType);

    if (updatedItem.discount && updatedItem.discount !== 0) {
      if (updatedItem.discountType === '%') {
        updatedItem.amount = amount - (amount * updatedItem.discount) / 100;
      } else if (updatedItem.discountType === '₹') {
        const discountedAmount = Math.max(amount - updatedItem.discount, 0);
        updatedItem.amount = discountedAmount;
      }
    } else {
      updatedItem.amount = amount;
    }
    console.log('Calculated Amount:', updatedItem.amount);
    setItems(updatedItems);
  };

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setSubTotal(total);
  }, [items]);

  useEffect(() => {
    let totalTax = 0;
    let totalCess = 0;

    items.forEach(item => {
      const taxAmount = (item.amount * item.tax) / 100;
      const cessAmount = (item.amount * item.cess) / 100;

      totalTax += taxAmount;
      totalCess += cessAmount;

    });

    setIgst(totalTax);
    setCess(totalCess);

  }, [items]);

  useEffect(() => {
    const calculateTaxableAmount = () => {
      let discount = 0;
      if (discountType === '%') {
        discount = subTotal * (additionalDiscountValue / 100);
      } else if (discountType === '₹') {
        discount = additionalDiscountValue;
      }
      const newTaxableAmount = subTotal - discount;
      setTaxableAmount(newTaxableAmount > 0 ? newTaxableAmount : 0); // Ensure taxable amount is not negative
    };

    calculateTaxableAmount();
  }, [subTotal, discountType, additionalDiscountValue]);

  useEffect(() => {
    const newTotalAmount = taxableAmount + igst + cess;
    setTotalAmount(newTotalAmount);
  }, [taxableAmount, igst, cess]);

  const roundedTotal = roundOff ? Math.round(subTotal) : subTotal;

  const validateForm = () => {
    let formErrors: { [key: string]: string | boolean } = {};
    if (!salesOrderDetails.orderType) {
      formErrors.orderType = 'Please select an Order Type';
    }
    if (!salesOrderDetails.voucherType) {
      formErrors.voucherType = 'Please select a Voucher Type';
    }
    if (!salesOrderDetails.orderNumber) {
      formErrors.orderNumber = 'Please enter Order Number';
    }
    if (!salesOrderDetails.ledger) {
      formErrors.ledger = 'Please select a Ledger';
    }
    if (!salesOrderDetails.dueDays) {
      formErrors.dueDays = 'Please enter Due Days';
    }
    if (!salesOrderDetails.billTo) {
      formErrors.billTo = 'Please select a Bill To';
    }
    if (!salesOrderDetails.shipTo) {
      formErrors.shipTo = 'Please select a Ship To';
    }
    if (!salesOrderDetails.transport) {
      formErrors.transport = 'Please select a Transport';
    }
    if (!salesOrderDetails.transportMode) {
      formErrors.transportMode = 'Please select a Transport Mode';
    }
    if (!salesOrderDetails.wareHouse) {
      formErrors.wareHouse = 'Please select a Warehouse';
    }
    if (!salesOrderDetails.vehicleNumber) {
      formErrors.vehicleNumber = 'Please enter Vehicle Number';
    }
    if (!salesOrderDetails.lrNo) {
      formErrors.lrNo = 'Please enter LR No';
    }
    if (!salesOrderDetails.lrDate) {
      formErrors.lrDate = 'Please select an LR Date';
    }
    if (items.length === 0) {
      formErrors.addItem = 'Please Add Items in invoice';
    }  
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };

  console.log(errors, "erros");
  

  const handleCancel = () => {
    // Reset the form fields
    setSalesOrderDetails({
      orderType: '',
      voucherType: '',
      orderNumber: '',
      orderDate: new Date(),
      ledger: '',
      dueDays: '',
      billTo: '',
      shipTo: '',
      transport: 0,
      transportMode: '',
      wareHouse: '',
      vehicleNumber: '',
      lrNo: '',
      lrDate: new Date(),
    });
    setItems([]); 
    setTaxableAmount(0); 
    setTotalAmount(0);
    setSubTotal(0);
    setIgst(0);
    setCess(0);
    setDiscountType('%');
    setAdditionalDiscountValue(0);
    setRoundOff(false);
    setErrors({})
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const salesOrderData = {
        salesOrderDetails,
        items,
        taxableAmount,
        totalAmount,
        subTotal,
        igst,
        cess,
        discountType,
        additionalDiscountValue,
        roundOff,
      };

      try {
        const existingSalesOrders = JSON.parse(localStorage.getItem('salesOrders') || '[]');
        const updatedSalesOrders = [...existingSalesOrders, salesOrderData];
        localStorage.setItem('salesOrders', JSON.stringify(updatedSalesOrders));

        // Reset the form fields
        setSalesOrderDetails({
          orderType: '',
          voucherType: '',
          orderNumber: '',
          orderDate: new Date(),
          ledger: '',
          dueDays: '',
          billTo: '',
          shipTo: '',
          transport: 0,
          transportMode: '',
          wareHouse: '',
          vehicleNumber: '',
          lrNo: '',
          lrDate: new Date(),
        });
        setItems([]); // Reset items array
        setTaxableAmount(0); // Reset other states as necessary
        setTotalAmount(0);
        setSubTotal(0);
        setIgst(0);
        setCess(0);
        setDiscountType('%');
        setAdditionalDiscountValue(0);
        setRoundOff(false);

        console.log('Sales order submitted successfully:', salesOrderData);
        // Reset the form or provide feedback to the user
      } catch (error) {
        console.error('Error submitting sales order:', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSalesOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, field: keyof SalesOrderDetails) => {
    const { value } = event.target;
    setSalesOrderDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof SalesOrderDetails) => {
    const { value } = event.target;
    setSalesOrderDetails((prevDetails) => ({
      ...prevDetails,
      [field]: new Date(value), 
    }));
  };



  return (
    <div className='flex flex-col'>
      <div className='flex justify-between my-2 h-16 items-center border-b-2 px-6'>
        <div className='flex flex-col'>
          <h3 className="text-xl font-bold">Add Sales Order</h3>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontFamily: 'Josefin Sans', }} variant='caption' color="text.primary">Dashboard</Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans', }} variant='caption' color="text.primary">Sales</Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans', }} variant='caption' color="text.primary">Sales_Order</Typography>
            <Typography sx={{ fontFamily: 'Josefin Sans', }} variant='caption' color="text.primary">Create_Order</Typography>
          </Breadcrumbs>
        </div>
        <div className='flex justify-center items-center'>
          <Stack spacing={2} direction="row">
            <Button sx={{ backgroundColor: '#105e63' }} onClick={handleCancel} size="medium" variant="contained">CANCEL</Button>
            <Button sx={{ backgroundColor: '#105e63' }} onClick={handleSubmit} size="medium" variant="contained">SUBMIT</Button>
          </Stack>
        </div>
      </div>
      <div className='px-4 pt-4'>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: 500 }} variant="subtitle1" gutterBottom>
              Order Type
            </Typography>
            <SelectInput
              options={orderTypeOptions}
              value={salesOrderDetails.orderType}
              error={Boolean(errors.orderType)}
              helperText={errors.orderType as string}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'orderType')}

            />
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Josefin Sans', mt: 2, fontSize: "1rem", fontWeight: "500" }}>
              Ledger
            </Typography>
            <SelectInput
              options={ledgerOptions}
              value={salesOrderDetails.ledger}
              error={Boolean(errors.ledger)}
              helperText={errors.ledger as string}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'ledger')}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} gutterBottom>
              Voucher Type
            </Typography>
            <SelectInput options={voucherTypeOptions}
              error={Boolean(errors.voucherType)}
              helperText={errors.voucherType as string}
              value={salesOrderDetails.voucherType}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'voucherType')}
            />
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Josefin Sans', mt: 2, fontSize: "1rem", fontWeight: "500" }}>
              Due Days
            </Typography>
            <SelectNumberInput label="" type="text"
              name="dueDays"
              error={Boolean(errors.dueDays)}
              helperText={errors.dueDays as string}
              value={salesOrderDetails.dueDays}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Order Number
            </Typography>
            <SelectNumberInput label="" type="text"
              name="orderNumber"
              error={Boolean(errors.orderNumber)}
              helperText={errors.orderNumber as string}
              value={salesOrderDetails.orderNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Order Date
            </Typography>
            <SelectNumberInput label="" type='date'
              name="orderDate"
              error={Boolean(errors.orderDate)}
              helperText={errors.orderDate as string}      
              value={(salesOrderDetails.orderDate instanceof Date ? salesOrderDetails.orderDate : new Date(salesOrderDetails.orderDate)).toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e as ChangeEvent<HTMLInputElement>, 'orderDate')}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Bill To
            </Typography>
            <SelectInput options={billToOptions}
              error={Boolean(errors.billTo)}
              helperText={errors.billTo as string}  
              value={salesOrderDetails.billTo}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'billTo')} />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Ship To
            </Typography>
            <SelectInput options={shipToOptions}
                error={Boolean(errors.shipTo)}
                helperText={errors.shipTo as string}  
              value={salesOrderDetails.shipTo}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'shipTo')}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: '#105e63' }} />
          </Grid>
          {/* Second row */}
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Transport
            </Typography>
            <SelectInput options={transportOptions}
               error={Boolean(errors.transport)}
               helperText={errors.transport as string}
              value={salesOrderDetails.transport}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'transport')}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Transport Mode
            </Typography>
            <SelectInput options={transportModeOptions}
             error={Boolean(errors.transportMode)}
             helperText={errors.transportMode as string}
              value={salesOrderDetails.wareHouse}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'wareHouse')}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Warehouse
            </Typography>
            <SelectInput
              options={warehouseOptions}
              error={Boolean(errors.wareHouse)}
              helperText={errors.wareHouse as string}
              value={salesOrderDetails.transportMode}
              onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>, 'transportMode')} />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Vehicle Number
            </Typography>
            <SelectNumberInput label="" type="text"
              name="vehicleNumber"
              error={Boolean(errors.vehicleNumber)}
              helperText={errors.vehicleNumber as string}
              value={salesOrderDetails.vehicleNumber}
              onChange={handleInputChange} />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              LR No
            </Typography>
            <SelectNumberInput label="" type="text"
              name="lrNo"
              error={Boolean(errors.lrNo)}
              helperText={errors.lrNo as string}
              value={salesOrderDetails.lrNo}
              onChange={handleInputChange} />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              LR Date
            </Typography>
            <SelectNumberInput label="" type="date"
              name="lrDate"
              error={Boolean(errors.lrDate)}
              helperText={errors.lrDate as string}
              value={(salesOrderDetails.lrDate instanceof Date ? salesOrderDetails.lrDate : new Date(salesOrderDetails.lrDate)).toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e as ChangeEvent<HTMLInputElement>, 'lrDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: '#105e63' }} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography sx={{ fontFamily: 'Josefin Sans', mt: 2, fontSize: "1rem", fontWeight: "500" }} variant="subtitle1" gutterBottom>
              Add Item
            </Typography>
            <SelectInput options={itemOptions}
              error={Boolean(errors.addItem)}
              helperText={errors.addItem as string}            
              onChange={handleAddItemSelectChange}
               />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead sx={{ alignContent: 'center' }}>
                  <TableRow sx={{ backgroundColor: '#e6f2f2' }} >
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontFamily: 'Josefin Sans', alignItems: 'center', fontWeight: '600', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>ITEM</TableCell>
                    <TableCell align='center' colSpan={2} sx={{ fontSize: '0.8rem', fontFamily: 'Josefin Sans', fontWeight: '600', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>QUANTITY</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>RATE</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>TAX (%)</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>CESS (%)</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>DISCOUNT (% or ₹ )</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>AMOUNT</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}>REMARK</TableCell>
                    <TableCell align='center' sx={{ fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Josefin Sans', color: '#105e63', border: '1px solid #dbdada', padding: '4px' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: '#fff' }}>
                  {items.map((item, index) => (
                    <TableRow key={index} sx={{ height: '16px' }}>
                      <EditableCell value={item.item}
                        onSave={(value) => handleCellSave(index, 'item', value as string)} />
                      <EditableCell value={item.quantity} onSave={(value) => handleCellSave(index, 'quantity', Number(value))} />
                      <EditableCell value={item.unit} onSave={(value) => handleCellSave(index, 'unit', value as string)} />
                      <EditableCell value={item.rate} onSave={(value) => handleCellSave(index, 'rate', Number(value))} />
                      <EditableCell value={item.tax} onSave={(value) => handleCellSave(index, 'tax', Number(value))} />
                      <EditableCell value={item.cess} onSave={(value) => handleCellSave(index, 'cess', Number(value))} />
                      <EditableCell value={item.discount} isDropdown={true} onSave={(value) => handleCellSave(index, 'discount', Number(value))} />
                      <EditableCell value={item.amount.toFixed(2)} isEditable={false} onSave={(value) => handleCellSave(index, 'amount', Number(value))} />
                      <EditableCell value={item.remark} onSave={(value) => handleCellSave(index, 'remark', value as string)} />
                      <TableCell align='center' sx={{ border: '1px solid #dbdada', padding: '4px' }}>
                        <IconButton onClick={() => handleDelete(index)} size="small">
                          <DeleteIcon fontSize="small" sx={{ color: '#105e63' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', border: '1px solid #dbdada', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: 'Josefin Sans', ml: 2, fontSize: 14, color: '#105e63' }}>Term and Condition</Typography>
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16, color: '#105e63' } }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '509px', height: '34px', borderLeft: '2px solid #dbdada', alignItems: 'center', px: '2' }}>
                <Typography sx={{ fontFamily: 'Josefin Sans', ml: 2, color: '#105e63', fontWeight: 'bold', fontSize: 14, paddingLeft: '4px' }}>Sub Total</Typography>
                <Typography sx={{ fontFamily: 'Josefin Sans', mr: 2, color: '#105e63', fontWeight: 'bold', fontSize: 14, marginLeft: 1, paddingRight: '4px' }}>₹ {subTotal.toFixed(2)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
              <Table sx={{ fontFamily: 'Josefin Sans', maxWidth: 510, '& td': { border: 'none', padding: '4px 16px' } }} >
                <TableBody >
                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ borderBottom: 'none', border: '2px solid #dbdada' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" sx={{ color: '#105e63', padding: 0, marginRight: 1 }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>Additional Charges</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14, borderRight: '2px solid #dbdada' }}>
                      Discount
                    </TableCell>
                    <TableCell sx={{ display: 'flex', borderRight: '2px solid #dbdada', borderLeft: '2px solid #dbdada', justifyContent: 'space-between', fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>
                      <Box sx={{ borderRight: '2px solid #dbdada', borderLeft: '2px solid #dbdada' }}>
                        <Select
                          value={discountType}
                          size="small"
                          onChange={handleDiscountTypeChange}
                          sx={{
                            marginRight: 1,
                            fontSize: 14,
                            padding: '0 8px',
                            border: 'none',
                            minWidth: 50,
                            '& .MuiSelect-select': {
                              padding: 0,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                          }}
                        >
                          <MenuItem value="%">%</MenuItem>
                          <MenuItem value="₹">₹</MenuItem>
                        </Select>
                        <TextField
                          type="number"
                          size="small"
                          value={additionalDiscountValue}
                          onChange={handleDiscountValueChange}
                          inputProps={{ min: 0 }}
                          sx={{
                            width: '60px', marginRight: 1, fontSize: 14, '& .MuiInputBase-input': { padding: '0 8px' },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <h6>
                          {discountType}
                        </h6>
                        {additionalDiscountValue}
                      </Box>

                    </TableCell>
                  </TableRow>


                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14, borderRight: '2px solid #dbdada' }}>Taxable Amount</TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14, borderLeft: '2px solid #dbdada' }}>{taxableAmount.toFixed(2)}</TableCell>
                  </TableRow>

                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>IGST</TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>{igst.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>Cess Amount (%)</TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>{cess.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}  >RoundOff</Typography>
                        <Switch
                          checked={roundOff}
                          onChange={(e) => setRoundOff(e.target.checked)}
                          sx={{
                            marginLeft: 1,
                            '& .MuiSwitch-thumb': { backgroundColor: '#105e63' },
                            '& .MuiSwitch-track': { backgroundColor: '#e6f2f2' },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontSize: 14 }}>{roundedTotal.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: '1px solid #dbdada' }}>
                    <TableCell sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontWeight: 'bold', fontSize: 14 }}>Total Amount</TableCell>
                    <TableCell align="right" sx={{ fontFamily: 'Josefin Sans', color: '#105e63', fontWeight: 'bold', fontSize: 14 }}>{totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );
};

export default SalesOrder;
