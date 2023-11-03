const API_BASE_URL = process.env.REACT_APP_URL;

const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
  employee: {
    create: `${API_BASE_URL}/employee/create`,
    viewList: `${API_BASE_URL}/employee/list`,
    viewProfile: (employeeId) => `${API_BASE_URL}/employee/${employeeId}`,
  },
};

export default API_ENDPOINTS;
