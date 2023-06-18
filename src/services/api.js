import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Reemplaza con la URL base de tu API

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/user`);
};

export const createUser = (userData) => {
  return axios.post(`${API_BASE_URL}/user`, userData);
};

export const updateUser = (userId, userData) => {
  return axios.put(`${API_BASE_URL}/user/${userId}`, userData);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_BASE_URL}/user/${userId}`);
};
