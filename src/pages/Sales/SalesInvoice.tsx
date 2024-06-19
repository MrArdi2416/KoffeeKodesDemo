import React, { useEffect, useState } from 'react'


interface SalesOrderDetails {
  orderType: string;
  voucherType: string;
  orderNumber: string;
  orderDate: Date;
  ledger: string;
  dueDays: string;
  billTo: string;
  shipTo: string;
  transport: number;
  transportMode: string;
  wareHouse: string;
  vehicleNumber: string;
  lrNo: string;
  lrDate: Date;
}

interface SalesOrderData {
  salesOrderDetails: SalesOrderDetails;
  items: any[];
  taxableAmount: number;
  totalAmount: number;
  subTotal: number;
  igst: number;
  cess: number;
  discountType: string;
  additionalDiscountValue: number;
  roundOff: boolean;
}




const SalesInvoice = () => {

  const [salesInvoices, setSalesInvoices] =  useState<SalesOrderData[]>([]);
  useEffect(() => {
    const storedSalesOrders = localStorage.getItem('salesOrders');
    if (storedSalesOrders) {
      setSalesInvoices(JSON.parse(storedSalesOrders));
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-4">Sales Invoice</h1>
        <h1>{}</h1>
        {salesInvoices.length === 0 ? (
        <p>No sales orders found.</p>
      ) : (
        <ul>
          {salesInvoices.map((order, index) => (
            <li key={index}>
              <p>Sr Number: {index + 1}</p>

              <p>Order Number: {order.salesOrderDetails.orderNumber}</p>
              <p>Order Date: {order.salesOrderDetails.orderDate.toString()}</p>
              <p>Total Amount: {order.totalAmount}</p>
              {/* Add more fields as necessary */}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default SalesInvoice
