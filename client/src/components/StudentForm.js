import React, { useState, useEffect } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentForm.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: 'cse',
    enrollmentYear: new Date().getFullYear(),
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const departments = ['cse', 'ece', 'mech', 'civil', 'eee'];
  const navigate = useNavigate();

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('studentForm');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('studentForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // Auto-capitalize names
    if (name === 'firstName' || name === 'lastName') {
      newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Validation logic
    if (name === 'email' && !/\S+@\S+\.\S+/.test(newValue)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    } else if ((name === 'firstName' || name === 'lastName') && newValue.length < 2) {
      setErrors(prev => ({ ...prev, [name]: 'Must be at least 2 characters' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/students', {
        ...formData,
        dob: new Date(formData.dob)
      });
      toast.success(`Student ${formData.firstName} ${formData.lastName} registered!`, { className: 'cyber-toast' });
      localStorage.removeItem('studentForm');
      setFormData({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        department: '',
        enrollmentYear: new Date().getFullYear(),
        isActive: true
      });
      navigate('/StudentManagementDashboard');
    } catch (error) {
      toast.error('Registration failed', { className: 'cyber-toast error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-form-container">
      <div className="cyber-header">
        <h1 className="cyber-title">STUDENT REGISTRATION</h1>
        <div className="cyber-underline"></div>
      </div>

      <form onSubmit={handleSubmit} className="cyber-form">
        <div className="cyber-form-grid">

          {/* Student ID */}
          <div className="cyber-input-group">
            <label className="cyber-label">[ID_NUMBER]</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              pattern="[A-Za-z0-9]+"
              className="cyber-input"
            />
          </div>

          {/* First Name */}
          <div className="cyber-input-group">
            <label className="cyber-label">[FIRST_NAME]</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength="2"
              className="cyber-input"
            />
            {errors.firstName && <p className="cyber-error">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="cyber-input-group">
            <label className="cyber-label">[LAST_NAME]</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength="2"
              className="cyber-input"
            />
            {errors.lastName && <p className="cyber-error">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="cyber-input-group">
            <label className="cyber-label">[EMAIL]</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="cyber-input"
            />
            {errors.email && <p className="cyber-error">{errors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div className="cyber-input-group">
            <label className="cyber-label">[DATE_OF_BIRTH]</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              className="cyber-input"
            />
          </div>

          {/* Department */}
          <div className="cyber-input-group">
            <label className="cyber-label">[DEPARTMENT]</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="cyber-input"
            >
              <option value="" disabled>-- Select Department --</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept.toUpperCase()}</option>
              ))}
            </select>

          </div>

          {/* Enrollment Year */}
          <div className="cyber-input-group">
            <label className="cyber-label">[ENROLLMENT_YEAR]</label>
            <input
              type="number"
              name="enrollmentYear"
              value={formData.enrollmentYear}
              onChange={handleChange}
              required
              min="2000"
              max={new Date().getFullYear()}
              className="cyber-input"
            />
          </div>

          {/* Status Toggle */}
          <div className="cyber-input-group span-full">
            <div className="cyber-toggle">
              <label className="cyber-label">[STATUS]</label>
              <label className="cyber-switch">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span className="cyber-slider"></span>
                <span className={`cyber-status ${formData.isActive ? 'active' : 'inactive'}`}>
                  {formData.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </label>

            </div>
          </div>
        </div>

        <div className="cyber-actions">
          <button type="submit" className="cyber-button submit" disabled={loading}>
            <span className="glow-text">{loading ? 'SUBMITTING...' : 'SUBMIT DATA'}</span>
          </button>
          <button
            type="button"
            className="cyber-button cancel"
            onClick={() => {
              if (window.confirm('Are you sure you want to cancel?')) {
                navigate('/manage-students');
              }
            }}
          >
            <span className="glow-text">CANCEL</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
