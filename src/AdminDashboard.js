
import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/AdminDashboard.css';
import AddAdmin from './AddAdmin';
import ViewUserStats from './ViewUserStats';
import AccountSettings from './AccountSettings';

function AdminDashboard() {

  const [activeComponent, setActiveComponent] = useState('viewUserStats');
  const handleAddAdminClick = () => {
    setActiveComponent('addAdmin');
    setIsClicked1(!isClicked1);
    setIsClicked2(false);
    setIsClicked3(false);
  };

  const handleViewUserStateClick = () => {
    setActiveComponent('viewUserStats');
    setIsClicked2(!isClicked2);
    setIsClicked1(false);
    setIsClicked3(false);
  }

  const handleAccountSettingsClick = () => {
    setActiveComponent('accountSettings');
    setIsClicked3(!isClicked3);
    setIsClicked1(false);
    setIsClicked2(false);
  }

  // State to manage whether the container is clicked or not
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(true);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isClicked4, setIsClicked4] = useState(false);

    // Define the style object based on the clicked state
    const containerStyle1 = {
      cursor: 'pointer',
      backgroundColor: isClicked1 ? '#0066CC' : 'transparent'// Change background color based on the clicked state
    };

    const containerStyle2 = {
      cursor: 'pointer',
      backgroundColor: isClicked2 ? '#0066CC' : 'transparent'// Change background color based on the clicked state
    };

    const containerStyle3 = {
      cursor: 'pointer',
      backgroundColor: isClicked3 ? '#0066CC' : 'transparent'// Change background color based on the clicked state
    };

    const containerStyle4 = {
      cursor: 'pointer',
      backgroundColor: isClicked4 ? '#0066CC' : 'transparent'// Change background color based on the clicked state
    };

  return (
    <div className="app">
      <div className="navigationbar">
        <div className="sub-container1 top" >Admin Mode</div>
        <div className="sub-container1 top" style={containerStyle1} onClick={handleAddAdminClick}>Add an Admin</div>
        <div className="sub-container1 top" style={containerStyle2} onClick={handleViewUserStateClick}>View User Stats</div>
        <div className="sub-container1 top" style={containerStyle4} onClick ={() =>window.location.href = '/userdashboard'}>Change to user mode</div>
        <div className="sub-container1 middle"></div>
        <div className="sub-container1 bottom" style={containerStyle3} onClick={handleAccountSettingsClick} >Account Settings</div>
      </div>
      <div className="container2">
        <div className="sub-container2 heading">
          <div><h4>Code Summarizer and Evaluation Tool</h4></div>
          <div>Logout</div></div>
        <div className="sub-container2 renderarea">  {activeComponent === 'addAdmin' && <AddAdmin />}
                                                     {activeComponent === 'viewUserStats' && <ViewUserStats/>}
                                                     {activeComponent === 'accountSettings' && <AccountSettings/>}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
