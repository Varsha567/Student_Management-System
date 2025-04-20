export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const clearAuth = () => {
    localStorage.removeItem('token');
  };