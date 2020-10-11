import React from 'react';
import '../app/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import OTPPage from './pages/otp';
import TicketPage from './pages/ticket';
import EventDetailPage from './pages/eventdetail';
import RegisterPage from './pages/register';
import styled from 'styled-components';

const Background = styled.div`
  background: linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) ),url('https://i.pinimg.com/originals/64/bf/99/64bf99f576bcbca08e28db9f3f72718f.jpg');
  width:100vw;
  height:100vh;
  background-size: cover;
  background-repeat: no-repeat;
`

function App() {
  return (
    <Background>
    <Router>
        <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/otp">
            <OTPPage/>
          </Route>
          <Route path="/checkout/:id">
            <EventDetailPage/>
          </Route>
          <Route path="/ticket" render={(props) => <TicketPage {...props}/>}/>
          <Route path="/">
            <LoginPage/>
          </Route>
        </Switch>
    </Router>
    </Background>
  );
}

export default App;
