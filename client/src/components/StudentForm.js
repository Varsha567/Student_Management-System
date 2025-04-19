// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const navigate = useNavigate();

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
      await axios.post('/students', formData);
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to add student.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required />
        </label><br />

        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label><br />

        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label><br />

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label><br />

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label><br />

        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </label><br />

        <label>
          Enrollment Year:
          <input type="number" name="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} required />
        </label><br />

        <label>
          Active:
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
        </label><br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
