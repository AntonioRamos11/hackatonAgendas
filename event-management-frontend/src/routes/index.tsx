import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Clients from '../pages/clients/Clients';
import ClientDetails from '../pages/clients/ClientDetails';
import Events from '../pages/events/Events';
import EventDetails from '../pages/events/EventDetails';
import Inventory from '../pages/inventory/Inventory';
import InventoryDetails from '../pages/inventory/InventoryDetails';
import Invoices from '../pages/invoices/Invoices';
import InvoiceDetails from '../pages/invoices/InvoiceDetails';
import Quotes from '../pages/quotes/Quotes';
import QuoteDetails from '../pages/quotes/QuoteDetails';
import Staff from '../pages/staff/Staff';
import StaffDetails from '../pages/staff/StaffDetails';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" render={() => (
          <AuthLayout>
            <Switch>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/register" component={Register} />
            </Switch>
          </AuthLayout>
        )} />
        <Route path="/" render={() => (
          <DashboardLayout>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/clients" exact component={Clients} />
              <Route path="/clients/:id" component={ClientDetails} />
              <Route path="/events" exact component={Events} />
              <Route path="/events/:id" component={EventDetails} />
              <Route path="/inventory" exact component={Inventory} />
              <Route path="/inventory/:id" component={InventoryDetails} />
              <Route path="/invoices" exact component={Invoices} />
              <Route path="/invoices/:id" component={InvoiceDetails} />
              <Route path="/quotes" exact component={Quotes} />
              <Route path="/quotes/:id" component={QuoteDetails} />
              <Route path="/staff" exact component={Staff} />
              <Route path="/staff/:id" component={StaffDetails} />
            </Switch>
          </DashboardLayout>
        )} />
      </Switch>
    </Router>
  );
};

export default Routes;