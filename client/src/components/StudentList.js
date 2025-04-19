import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';  // Assuming axios is configured in api.js

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/students');  // Fetch students from API
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students available</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`/edit-student/${student.id}`}>Edit</Link> {/* Navigate to Edit page */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <nav>
        <Link to="/add-student">Add New Student</Link>
      </nav>
    </div>
  );
};

export default StudentList;
