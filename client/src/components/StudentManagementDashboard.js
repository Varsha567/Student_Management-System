import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';
import './SMD.css'; // Reusing HomePage/StudentList styles

const StudentManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/students');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student permanently?')) {
      try {
        await axios.delete(`/students/${id}`);
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName} ${student.studentId} ${student.department}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="management-container">
      <div className="list-header">
        <h1 className="neon-text">MANAGE STUDENTS</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <Link to="/add-student" className="add-button">
            + NEW STUDENT
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DOB</th>
              <th>DEPT</th>
              <th>YEAR</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr className="no-data">
                <td colSpan="8">
                  {searchTerm ? 'No matching students found' : 'No student records available'}
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className="student-row">
                  <td className="monospace">{student.studentId}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{formatDate(student.dob)}</td>
                  <td className="department">{student.department.toUpperCase()}</td>
                  <td>{student.enrollmentYear}</td>
                  <td>
                    <span className={`status ${student.isActive ? 'active' : 'inactive'}`}>
                      {student.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <Link 
                      to={`/students/${student._id}/edit`} 
                      className="action-button edit-button"
                    >
                      EDIT
                    </Link>
                    <button 
                      onClick={() => handleDelete(student._id)}
                      className="action-button delete-button"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagementDashboard;