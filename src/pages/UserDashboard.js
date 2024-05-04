import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/AdminDashboard.css';
import InputCode from './InputCode';
import ViewSummary from './ViewSummary';
import Translator from './Translator';
import Feedback from './styling/Feedback';

function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState('viewSummary');

  const handleViewSummaryClick = () => {
    setActiveComponent('viewSummary');
    setIsClicked1(!isClicked1);
    setIsClicked2(false);
    setIsClicked3(false);
    setIsClicked4(false);
  };

  const handleTranslatorClick = () => {
    setActiveComponent('translator');
    setIsClicked2(!isClicked2);
    setIsClicked1(false);
    setIsClicked3(false);
    setIsClicked4(false);
  }

  const handleFeedbackClick = () => {
    setActiveComponent('feedback');
    setIsClicked3(!isClicked3);
    setIsClicked1(false);
    setIsClicked2(false);
    setIsClicked4(false);
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
        <div className="sub-container1 top" style={containerStyle1} onClick={handleViewSummaryClick}>View Summary</div>
        <div className="sub-container1 top" style={containerStyle2} onClick={handleTranslatorClick}>Translator</div>
        <div className="sub-container1 top" style={containerStyle3} onClick={handleFeedbackClick}>Feedback</div>
        <div className="sub-container1 bottom" style={containerStyle4} onClick={handleInputCodeClick}>Input Code</div>
      </div>
      <div className="container2">
        <div className="sub-container2 heading">
          <div><h4>Code Summarizer and Evaluation Tool</h4></div>
          <div>Logout</div>
        </div>
        <div className="sub-container2 renderarea">
          {activeComponent === 'viewSummary' && <ViewSummary />}
          {activeComponent === 'translator' && <Translator />}
          {activeComponent === 'feedback' && <Feedback />}
          {activeComponent === 'inputCode' && <InputCode />}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
