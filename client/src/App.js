// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentManagementDashboard from './components/StudentManagementDashboard';
import EditStudentForm from './components/EditStudentForm';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<HomePage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/manage-students" element={<StudentManagementDashboard/>} />
          <Route path="/edit-student/:id" element={<EditStudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;