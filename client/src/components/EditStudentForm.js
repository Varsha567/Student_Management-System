import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: 'cse',
    enrollmentYear: '',
    isActive: true
  });

  const departments = ['cse', 'ece', 'mech', 'civil', 'eee'];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/students/${id}`);
        // Format date for input field (YYYY-MM-DD)
        const dobDate = new Date(response.data.dob);
        const formattedDob = dobDate.toISOString().split('T')[0];
        
        setFormData({
          studentId: response.data.studentId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          dob: formattedDob,
          department: response.data.department,
          enrollmentYear: response.data.enrollmentYear,
          isActive: response.data.isActive
        });
      } catch (error) {
        toast.error('Failed to fetch student data');
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert string date back to Date object
      const submissionData = {
        ...formData,
        dob: new Date(formData.dob)
      };
      
      await axios.put(`/students/${id}`, submissionData);
      toast.success('Student updated successfully!');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update student');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Student ID:</label>
          <input 
            type="text" 
            name="studentId" 
            value={formData.studentId} 
            onChange={handleChange} 
            required 
            pattern="[A-Za-z0-9]+"
            title="Alphanumeric characters only"
          />
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            minLength="2"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            minLength="2"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
            required
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Enrollment Year:</label>
          <input 
            type="number" 
            name="enrollmentYear" 
            value={formData.enrollmentYear} 
            onChange={handleChange} 
            required
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="isActive" 
              checked={formData.isActive} 
              onChange={handleChange} 
            />
            Active Enrollment
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Update Student</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/students')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;