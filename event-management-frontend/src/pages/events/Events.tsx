import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import EventList from './EventList';
import EventCreate from './EventCreate';
import EventDetail from './EventDetail';
import './Events.css';

const Events: React.FC = () => {
  const { path } = useRouteMatch();
  
  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Event Management</h1>
        <Link to={`${path}/create`} className="btn-create">
          Create New Event
        </Link>
      </div>

      <Switch>
        <Route exact path={path} component={EventList} />
        <Route path={`${path}/create`} component={EventCreate} />
        <Route path={`${path}/:id`} component={EventDetail} />
      </Switch>
    </div>
  );
};

export default Events;