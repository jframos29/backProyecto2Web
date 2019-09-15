import React from 'react';
import Header from './pages/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddGroup from './pages/AddGroup';
import AddEvent from './pages/AddEvent';
import Group from './pages/Group';
import Calendar from './pages/Calendar';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LogReg from './LogReg';
import UFree from './pages/UFree';


function App() {
  return (
    <Router>
      <Route path="/" component={Header} />
      <Route path="/" component={Home} exact />
      <Route path="/myProfile" component={Profile}  />
      <Route path="/login" component={LogReg}  />
      <Route path="/groups/{id}" component={Group}  />
      <Route path="/addGroup" component={AddGroup}  />
      <Route path="/myCalendar" component={Calendar}  />
      <Route path="/uFree" component={UFree}  />
      <Route path="/busyHours" component={AddEvent}  />
      
      
      
      
    </Router>
  );
}

export default App;