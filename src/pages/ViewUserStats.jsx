import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SingleUserEval from './SingleUserEval.jsx';
import AllUsersEval from './AllUsersEval.jsx';
import CategoryUsersEval from './CategoryUsersEval.jsx';

function ViewUserStats() {

  const [activeTab, setActiveTab] = useState('#single'); // State to track active tab

  // Function to handle tab selection
  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <Card className="shadow"  style={{ width: '1000px', height: '450px' }}>
      <Card.Header style={{backgroundColor: '#99CCFF'}}>
        <Nav variant="tabs" defaultActiveKey="#single" onSelect={handleSelect}>
          <Nav.Item>
            <Nav.Link eventKey="#single" style={{color: '#000000'}}><h6>Single User Evaluation</h6></Nav.Link> {/* Specify event key for active tab */}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#all" style={{color: '#000000'}}><h6>Average Across all Users</h6></Nav.Link> {/* Specify event key for link tab */}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#cat" style={{color: '#000000'}}><h6>Average Across User Category</h6></Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {activeTab === '#single' && <SingleUserEval/>}
        {activeTab === '#all' && <AllUsersEval/>}
        {activeTab === '#cat' && <CategoryUsersEval/>}
      </Card.Body>
    </Card>

  );
}

export default ViewUserStats;
