import React, { useState, useEffect  } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'react-bootstrap/Card';

function SingleUserEval(){

 const [searchTerm, setSearchTerm] = useState('');
 const [selectedUsername, setSelectedUsername] = useState('');
 const [usernames, setUsernames] = useState([]);
 const [activeComponent, setActiveComponent] = useState('');
 const [userStats, setUserStats] = useState(null);

 useEffect(() => {
   const fetchUsernames = async () => {
     try {
       const response = await fetch(`http://localhost:5000/api/usernames?search=${searchTerm}`);
       if (!response.ok) {
         throw new Error('Failed to fetch usernames');
       }
       const data = await response.json();
       setUsernames(data);
     } catch (error) {
       console.error('Error fetching usernames:', error);
     }
   };

   if (searchTerm) {
     fetchUsernames();
   } else {
     setUsernames([]);
   }
 }, [searchTerm]);

 // Fetch user statistics when selectedUsername changes
  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/singleUserEval?search=${selectedUsername}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user statistics');
        }
        const data = await response.json();
        console.log(data)
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    if (selectedUsername) {
      fetchUserStatistics();
    } else {
      setUserStats(null); // Reset userStats if no username is selected
    }
  }, [selectedUsername]);

 const handleSearchChange = (event) => {
   const value = event.target.value;
   setActiveComponent('');
   setSearchTerm(value);
   setSelectedUsername(value); // Reflect search term as selected username
 };

 const handleUsernameSelect = (selectedUsername) => {
   setSelectedUsername(selectedUsername);
   setActiveComponent('viewUserStats');
   setSearchTerm('');
 };

 return (
   <div>
   <Form>
     <Form.Group>
       <Form.Label>Search Username</Form.Label>
       <Form.Control
         type="text"
         placeholder="Enter Username Here"
         value={selectedUsername}
         onChange={handleSearchChange}
       />
     </Form.Group>
     {usernames.length > 0 && (
       <Dropdown.Menu show>
         {usernames.map((username) => (
           <Dropdown.Item key={username} onClick={() => handleUsernameSelect(username)}>
             {username}
           </Dropdown.Item>
         ))}
       </Dropdown.Menu>
     )}
   </Form>
   <div className="d-flex"> {/* Use d-flex class from Bootstrap to make elements inline */}
       <div>
         {activeComponent === 'viewUserStats' && userStats && (
           <div>
             <h5 style={{ marginTop: '10px' }}>Statistics for {selectedUsername}</h5>
             <BarChart
               width={400}
               height={200}
               data={[
                 { name: 'Naturalness', Value: userStats.naturalness/(userStats.count*5) },
                 { name: 'Usefulness', Value: userStats.usefulness/(userStats.count*5) },
                 { name: 'Consistency', Value: userStats.consistency/(userStats.count*5) },
               ]}
             >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="Value" fill="#0066CC" barSize={20} />
             </BarChart>
           </div>
         )}
       </div>
       <div className="p-5"></div>
       <div className="mr-4" style={{marginTop: '10px'}}> {/* Add margin-right for spacing */}
         {activeComponent === 'viewUserStats' && userStats && (
           <Card className="shadow" style={{ width: '350px', height: '250px' }}>
           <Card.Header style={{backgroundColor: '#99CCFF'}}>
           <h5>User Statistics</h5>
           </Card.Header>
             <Card.Body>
               <Card.Text>
                 <p><strong>Naturalness:</strong> {userStats.naturalness/userStats.count}</p>
                 <p><strong>Usefulness:</strong> {userStats.usefulness/userStats.count}</p>
                 <p><strong>Consistency:</strong> {userStats.consistency/userStats.count}</p>
                 <p><strong>Total Number of Code Summaries:</strong> {userStats.count}</p>
               </Card.Text>
             </Card.Body>
           </Card>
         )}
       </div>
     </div>
   </div>

 );
}

export default SingleUserEval;
