import React from 'react';
import '../app/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import TicketPage from './pages/ticket';
import EventDetailPage from './pages/event';
import RegisterPage from './pages/register';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/event">
            <EventDetailPage/>
          </Route>
          <Route path="/ticket">
            <TicketPage/>
          </Route>
          <Route path="/">
            <LoginPage/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
