import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import SalesOrder from './pages/Sales/SalesOrder/SalesOrder';
import DeliveryNote from './pages/Sales/DeliveryNote';
import Header from './components/Header';
import Customers from './pages/Master/Customers';
import { Account } from './pages/Master/Account';
import PurchaseOrder from './pages/Purchase/PurchaseOrder';
import PurchaseInvoice from './pages/Purchase/PurchaseInvoice';
import PurchaseReturn from './pages/Purchase/PurchaseReturn';
import Dashboard from './pages/Dashboard/Dashboard';
import SalesInvoice from './pages/Sales/SalesInvoice';
import SalesReturn from './pages/Sales/SalesReturn';

function App() {
  return (
    <>
      <Router>
      <Header />
      <Layout>
        <Routes>
          <Route path="/dashboard" Component={Dashboard} />
          
          <Route path="/sales-order" Component={SalesOrder} />
          <Route path="/sales/delivery-note" Component={DeliveryNote} />
          <Route path="/sales/invoice" Component={SalesInvoice} />
          <Route path="/sales/return" Component={SalesReturn} />


          <Route path="/master-customers" Component={Customers} />
          <Route path="/master-account" Component={Account} />

          <Route path="/purchase-order" Component={PurchaseOrder} />
          <Route path="/purchase/invoice" Component={PurchaseInvoice} />
          <Route path="/purchase/return" Component={PurchaseReturn} />

        </Routes>
      </Layout>
    </Router>
    </>
  );
}

export default App;
