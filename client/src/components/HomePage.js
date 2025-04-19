// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Student Management System</h1>
      <nav>
        <Link to="/students">View Students</Link> |{" "}
        <Link to="/add-student">Add Student</Link>
      </nav>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Add Student Form</strong> - Form to input new student data</p>
        <p><strong>Edit Student Form</strong> - Prefilled form to edit existing student</p>
      </div>
    </div>
  );
};

export default HomePage;
