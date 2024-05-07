import React, { useState, useEffect  } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from 'react-bootstrap/Card';

function CategoryUsersEval(){

  const [selectedCategory, setSelectedCategory] = useState('Software Developer');
  const [categories, setCategories] = useState([]);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categoryUsersEval?search=${selectedCategory}`);
        if (!response.ok) {
          throw new Error('Failed to fetch usernames');
        }
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUserStatistics();
  }, [selectedCategory]);

  useEffect(() => {
    // Fetch all usernames from the server
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch usernames');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchCategories(); // Fetch usernames on component mount
  }, []);

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <div className="d-flex" style={{ width: '970px', justifyContent: 'space-between' }}>
      <div style={{ paddingRight: '90px' }}>
      <Form>
        <Form.Group>
          <Form.Label><h6>Choose Category:</h6></Form.Label>
          <Dropdown.Menu show> {/* Always show the dropdown menu */}
            {categories.map((Category) => (
              <Dropdown.Item key={Category} onClick={() => handleCategorySelect(Category)}
              style={{ backgroundColor: selectedCategory === Category ? "#d0cecf" : 'transparent'}}>
                {Category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Form.Group>
      </Form>
      </div>
      <div>
        {selectedCategory && (
          <div>
            <h6 style={{ marginTop: '10px' , paddingLeft: '50px'}}>User Statistics for {selectedCategory}</h6>
            <BarChart style={{paddingLeft: '20px'}}
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
        )}
      </div>
      <div style={{marginTop: '10px'}}> {/* Add margin-right for spacing */}
        {selectedCategory && (
          <Card className="shadow" style={{ width: '310px', height: '250px' }}>
          <Card.Header style={{backgroundColor: '#99CCFF'}}>
          <h5>User Statistics</h5>
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
        )}
      </div>
    </div>
  );

}

export default CategoryUsersEval;
