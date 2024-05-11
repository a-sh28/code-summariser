import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/AdminDashboard.css';
import InputCode from './InputCode';
import Translator from './Translator';
import SingleCode from './SingleCode';
import UserAccountSettings from './UserAccountSettings';
import ViewSummaries from './ViewSummaries';
import { WindowSharp } from '@mui/icons-material';


function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState('singleCode');


  const handleTranslatorClick = () => {
    setActiveComponent('translator');
    setIsClicked3(!isClicked3);
    setIsClicked1(false);
    setIsClicked5(false);
    setIsClicked2(false);
    setIsClicked4(false);
  }
  const handleSingleCodeClick = () => {
    setActiveComponent('singleCode');
    setIsClicked1(!isClicked1);
    setIsClicked2(false);
    setIsClicked3(false);
    setIsClicked5(false);
    setIsClicked4(false);

  }  
  const handleInputCodeClick = () => {
    setActiveComponent('inputCode');
    setIsClicked2(!isClicked2);
    setIsClicked1(false);
    setIsClicked3(false);
    setIsClicked4(false);
    setIsClicked5(false);
  }
  const handleAccountSettingsClick = () => {
    setActiveComponent('accountSettings');
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked3(false);
    setIsClicked5(false);
    setIsClicked4(!isClicked4);
  }

  const handleViewSummaries = () => {
    setActiveComponent('viewSummaries');
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked3(false);
    setIsClicked4(false);
    setIsClicked5(!isClicked5);

  }

  const handleLogOut = () => {
    window.location.href = '/signin';
  }

  const [isClicked1, setIsClicked1] = useState(true);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked4, setIsClicked4] = useState(false);
  const [isClicked5, setIsClicked5] = useState(false);
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
  const containerStyle5 = {
    cursor: 'pointer',
    backgroundColor: isClicked5 ? '#0066CC' : 'transparent'
  };


  return (
    <div className="app">
      <div className="navigationbar">
        <div className="sub-container1 top">User Dashboard</div>
        <div className="sub-container1 bottom" style={containerStyle1} onClick={handleSingleCodeClick}>Input Single Code</div>
        <div className="sub-container1 top" style={containerStyle2} onClick={handleInputCodeClick}>Input Code</div>  
        <div className="sub-container1 bottom" style={containerStyle3} onClick={handleTranslatorClick}>Translator</div>
        <div className="sub-container1 bottom" style={containerStyle4} onClick={handleAccountSettingsClick}>User Account Settings</div>
        <div className="sub-container1 bottom" style={containerStyle5} onClick={handleViewSummaries}>View Summaries</div>
      </div>
      <div className="container2">
        <div className="sub-container2 heading">
          <h4>Code Summarizer and Evaluation Tool</h4>
          <div onClick={handleLogOut}>Logout</div>
        </div>
        <div className="sub-container2 renderarea">
          {activeComponent === 'translator' && <Translator />}
          {activeComponent === 'singleCode' && <SingleCode />}
          {activeComponent === 'inputCode' && <InputCode />} 
          {activeComponent === 'accountSettings' && <UserAccountSettings />} 
          {activeComponent === 'viewSummaries' && <ViewSummaries/>}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
