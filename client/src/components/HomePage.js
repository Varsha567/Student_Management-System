// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <header className="header">
          <h1>STUDENT MANAGEMENT SYSTEM</h1>
          <p className="subtitle">
            <span className="highlight">TRACK</span> AND <span className="highlight">MANAGE</span> STUDENT RECORDS
          </p>
        </header>

        <main className="main-content">
          <div className="card-container">
            <Link to="/students" className="feature-card view-card">
              <div className="card-icon">👨‍🎓</div>
              <h3>VIEW STUDENTS</h3>
              <p>Browse all student records</p>
            </Link>

            <Link to="/add-student" className="feature-card add-card">
              <div className="card-icon">➕</div>
              <h3>ADD STUDENT</h3>
              <p>Create new student records</p>
            </Link>

            <Link to="/manage-students" className="feature-card add-card">
              <div className="card-icon">✏️</div>
              <h3>MANAGE DATA</h3>
              <p>Edit existing information</p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;