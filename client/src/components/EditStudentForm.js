import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, updateStudent, deleteStudent } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/EditStudentForm.css';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  const departments = ['cse', 'ece', 'mech', 'civil', 'eee'];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetchStudentById(id);
        const studentData = response.data.data;
        
        // Safely handle the date conversion
        let formattedDob = '';
        if (studentData.dob) {
          try {
            const dobDate = new Date(studentData.dob);
            if (!isNaN(dobDate.getTime())) {
              formattedDob = dobDate.toISOString().split('T')[0];
            }
          } catch (e) {
            console.error('Error parsing date:', e);
          }
        }

        setFormData({
          studentId: studentData.studentId || '',
          firstName: studentData.firstName || '',
          lastName: studentData.lastName || '',
          email: studentData.email || '',
          dob: formattedDob,
          department: studentData.department || '',
          enrollmentYear: studentData.enrollmentYear || '',
          isActive: studentData.isActive !== false // default to true if undefined
        });
      } catch (error) {
        toast.error('Failed to fetch student data');
        console.error(error);
      } finally {
        setLoading(false);
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
      const submissionData = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob) : null
      };
      await updateStudent(id, submissionData);
      toast.success('Student updated successfully!');
      navigate('/manage-students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update student');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this student permanently?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully!');
        navigate('/manage-students');
      } catch (error) {
        toast.error('Failed to delete student');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading student data...</div>;
  }

  return (
    <div className="edit-form-container">
      <div className="form-header">
        <h1 className="neon-text">EDIT STUDENT RECORD</h1>
        <p className="student-id">ID: {formData.studentId}</p>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
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
            <label>Last Name</label>
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
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
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Enrollment Year</label>
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

          <div className="form-group status-toggle">
            <label className="toggle-label">
              Enrollment Status
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  id="status-toggle"
                />
                <span className="slider"></span>
              </div>
              <span className="status-text">
                {formData.isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            SAVE CHANGES
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
          >
            DELETE RECORD
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/manage-students')}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;