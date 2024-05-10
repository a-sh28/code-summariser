

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import FirstPage from './firstpage'; 
import AdminDashboard from './AdminDashboard';
import ForgotPassword from './forgotpassword';
import UserDashboard from './UserDashboard';
import SingleCode from './SingleCode';
import InputCode from './InputCode';
import Translator from './Translator';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path ="/admindashboard" element={<AdminDashboard/>}/>
        <Route path = "/forgotpassword" element ={<ForgotPassword/>}/>
        <Route path = '/userdashboard' element = {<UserDashboard/>}/>
        <Route path = '/singlecode' element = {<SingleCode/>}/>
        <Route path = '/inputcode' element = {<InputCode/>}/>
        <Route path = '/translator' element = {<Translator/>}/>
      </Routes>
    </Router>
  );
}

export default App;
