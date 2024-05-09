import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/AdminDashboard.css';
import InputCode from './InputCode';
import Translator from './Translator';
import SingleCode from './SingleCode';
import {Button} from "react-bootstrap";

function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState('viewSummary');
  const handlelogout = () =>
    {
      window.alert("Are you sure you want to logout?");
      window.location.href="/";
    }

  const handleTranslatorClick = () => {
    setActiveComponent('translator');
    setIsClicked2(!isClicked2);
    setIsClicked1(false);
    setIsClicked3(false);
    setIsClicked4(false);
  }
  const handleSingleCodeClick = () => {
    setActiveComponent('singleCode');
  }  
  const handleInputCodeClick = () => {
    setActiveComponent('inputCode');
    setIsClicked4(!isClicked4);
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked3(false);
  }

  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked4, setIsClicked4] = useState(true);

  const containerStyle1 = {
    cursor: 'pointer',
    backgroundColor: isClicked1 ? '#0066CC' : 'transparent'
  };

  const containerStyle2 = {
    cursor: 'pointer',
    backgroundColor: isClicked2 ? '#0066CC' : 'transparent'
  };

  const containerStyle3 = {
    cursor: 'pointer',
    backgroundColor: isClicked3 ? '#0066CC' : 'transparent'
  };

  const containerStyle4 = {
    cursor: 'pointer',
    backgroundColor: isClicked4 ? '#0066CC' : 'transparent'
  };

  return (
    <div className="app">
      <div className="navigationbar">
        <div className="sub-container1 top">User Dashboard</div>
        <div className="sub-container1 bottom" onClick={handleSingleCodeClick}>Input Single Code</div>
        <div className="sub-container1 top" onClick={handleTranslatorClick}>Translator</div>
      </div>
      <div className="container2">
        <div className="sub-container2 heading">
          <h4>Code Summarizer and Evaluation Tool</h4>
          <Button onClick ={handlelogout}>Logout</Button> 
        </div>
        <div className="sub-container2 renderarea">
          {activeComponent === 'translator' && <Translator />}
          {activeComponent === 'singleCode' && <SingleCode />}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
