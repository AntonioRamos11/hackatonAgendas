import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Clients from './pages/clients/Clients';
import Events from './pages/events/Events';
import Inventory from './pages/inventory/Inventory';
import Invoices from './pages/invoices/Invoices';
import Quotes from './pages/quotes/Quotes';
import Staff from './pages/staff/Staff';

// PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token')
        ? <Component {...props} />
        : <Redirect to="/auth/login" />
    }
  />
);

const App = () => {
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
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/clients" component={Clients} />
              <PrivateRoute path="/events" component={Events} />
              <PrivateRoute path="/inventory" component={Inventory} />
              <PrivateRoute path="/invoices" component={Invoices} />
              <PrivateRoute path="/quotes" component={Quotes} />
              <PrivateRoute path="/staff" component={Staff} />
            </Switch>
          </DashboardLayout>
        )} />
      </Switch>
    </Router>
  );
};

export default App;