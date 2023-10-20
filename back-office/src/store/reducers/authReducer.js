const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      // Check if the token exists
      const isAuthenticated = !!token;
      // Update the isAuthenticated state based on the token existence
      return { isAuthenticated };
    }
    case 'LOGOUT': {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Update the isAuthenticated state to false
      return { isAuthenticated: false };
    }
    default:
      return state;
  }
};

export default authReducer;
