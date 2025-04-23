import axios from 'axios';


const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080/api' 
    : '/api' // Relative path for production
});
// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchStudents = () => API.get('/students');
export const fetchStudentById = (id) => API.get(`/students/${id}`);
export const createStudent = (student) => API.post('/students', student);
export const updateStudent = (id, student) => API.put(`/students/${id}`, student);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Auth endpoints
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const logout = () => API.get('/auth/logout');