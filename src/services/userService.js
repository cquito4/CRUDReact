import { getUsers, createUser, updateUser, deleteUser } from './api';

export const fetchUsers = async () => {
  try {
    const response = await getUsers();
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await createUser(userData);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const response = await updateUser(userId, userData);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    await deleteUser(userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
