import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'react-bootstrap/Card';

function AllUsersEval(){

  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/allUsersEval`);
        if (!response.ok) {
          throw new Error('Failed to fetch user statistics');
        }
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    fetchUserStatistics(); // Call fetchUserStatistics as soon as the component mounts
  }, []); // Empty dependency array ensures the effect runs only once, on component mount


  return (
    <div className="d-flex">
     <div>
       <div>
         <h5 style={{ marginTop: '10px' , marginBottom: '20px'}}>User Statistics for All Users</h5>
         <BarChart
           width={400}
           height={200}
           data={[
             { name: 'Naturalness', Value: userStats ? userStats.naturalness / (userStats.count * 5) : 0 },
             { name: 'Usefulness', Value: userStats ? userStats.usefulness / (userStats.count * 5) : 0 },
             { name: 'Consistency', Value: userStats ? userStats.consistency / (userStats.count * 5) : 0 },
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
     </div>
     <div className="p-5"></div>
     <div className="mr-4" style={{ marginTop: '10px' }}>
       <Card className="shadow" style={{ width: '350px', height: '250px' }}>
         <Card.Header style={{ backgroundColor: '#99CCFF' }}>
           <h5>Average Statistics Across All Users</h5>
         </Card.Header>
         <Card.Body>
           <Card.Text>
             <p><strong>Naturalness:</strong> {userStats ? userStats.naturalness / userStats.count : 0}</p>
             <p><strong>Usefulness:</strong> {userStats ? userStats.usefulness / userStats.count : 0}</p>
             <p><strong>Consistency:</strong> {userStats ? userStats.consistency / userStats.count : 0}</p>
             <p><strong>Total Number of Code Summaries:</strong> {userStats ? userStats.count : 0}</p>
           </Card.Text>
         </Card.Body>
       </Card>
     </div>
   </div>
  );

}

export default AllUsersEval;
