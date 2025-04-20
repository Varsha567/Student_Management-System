import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/SMD.css';

const StudentManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch all students when component mounts
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const response = await fetchStudents(); // No need for '/students' here
        setStudents(response.data); // Assuming response has { data: [...] }
      } catch (error) {
        console.error('Failed to load students:', error);
        toast.error('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Delete a student
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student permanently?')) return;
    
    try {
      await deleteStudent(id); // Just pass the ID, not full URL
      setStudents(prev => prev.filter(student => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete student');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchContent = `${student.firstName} ${student.lastName} ${student.studentId} ${student.department}`.toLowerCase();
    return searchContent.includes(searchTerm.toLowerCase());
  });

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
                <tr key={student._id}>
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
                      to={`/edit-student/${student._id}`} 
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