// src/components/EditStudentForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import { toast } from 'react-toastify';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', age: '' });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/students/${id}`);
        setFormData({ name: response.data.name, age: response.data.age });
      } catch (error) {
        toast.error('Failed to fetch student data.');
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/students/${id}`, formData);
      toast.success('Student updated successfully!');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to update student.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label><br />
        <label>
          Age: <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label><br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
