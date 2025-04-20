// src/components/HomePage.js
import { Link } from 'react-router-dom';
import './styles/HomePage.css';
import React from 'react';

const HomePage = () => {
  
return (
    <div className="home-container">
      <div className="content-wrapper">
        <header className="header">
        <h1>
        STUDENT MANAGEMENT SYSTEM
           
          </h1>
          
          <p className="subtitle">
            <span className="highlight">TRACK</span> AND <span className="highlight">MANAGE</span> STUDENT RECORDS
          </p>
          {/* New descriptive text */}
          <div className="intro-text">
            <p>Welcome to your <span className="highlight">neon-lit command center</span> for student data.</p>
            <p>Effortlessly organize, update, and analyze academic records with our <span className="highlight">high-performance</span> tools.</p>
          </div>
        </header>

        <main className="main-content">
          <div className="card-container">
            <Link to="/students" className="feature-card view-card">
              <div className="card-icon">👨‍🎓</div>
              <h3>VIEW STUDENTS</h3>
              <p>Access complete student profiles, attendance, and performance metrics.</p>
            </Link>

            <Link to="/add-student" className="feature-card add-card">
              <div className="card-icon">➕</div>
              <h3>ADD STUDENT</h3>
              <p>Enroll new students with our streamlined registration process.</p>
            </Link>

            <Link to="/manage-students" className="feature-card manage-card">
              <div className="card-icon">✏️</div>
              <h3>MANAGE DATA</h3>
              <p>Edit records, update grades, or modify personal details in seconds.</p>
            </Link>
          </div>

          {/* New footer text */}
          <div className="footer-text">
            <p>🔒 <span className="highlight">Secure</span> and <span className="highlight">reliable</span> — built for educators who demand precision.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;