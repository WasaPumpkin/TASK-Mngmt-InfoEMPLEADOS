////src/features/auth/authService.ts
import axios from 'axios';
import { LoginCredentials, RegisterCredentials, UserInfo } from './types';

// Define the API URL
const API_URL = 'http://localhost:7000/api/users'; // Local backend API URL

// Login API call
export const loginUserAPI = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data as UserInfo;
};

// Register API call
export const registerUserAPI = async ({
  name,
  email,
  password,
  role,
}: RegisterCredentials) => {
  const response = await axios.post(API_URL, { name, email, password, role });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data as UserInfo;
};

