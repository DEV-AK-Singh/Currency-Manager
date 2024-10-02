import useFetch from "../hooks/useFetch";

const API_BASE_URL = "http://localhost:5000/api";

const HEADER = {
  "Content-Type": "application/json",
};

const TOKEN_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return await response.json();
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return await response.json();
};

export const getUsers = () => {
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/users`,
    "GET",
    TOKEN_HEADER
  );
  return { data, loading, error };
};

export const getUser = (id) => {
  if(id === undefined || id === null) return {data: null, loading: true, error: null}; 
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/users/${id}`,
    "GET",
    TOKEN_HEADER
  );
  return { data, loading, error };
};

export const updateUser = (id, body) => {
  if(id === undefined || id === null || body === undefined || body === null) return {data: null, loading: true, error: null}; 
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/users/${id}`,
    "PUT",
    TOKEN_HEADER,
    body
  );
  return { data, loading, error };
};

export const deleteUser = (id) => {
  if(id === undefined || id === null) return {data: null, loading: true, error: null}; 
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/users/${id}`,
    "DELETE",
    TOKEN_HEADER
  );
  return { data, loading, error };
};

export const createTransaction = (body) => {
  if(body === undefined || body === null) return {data: null, loading: true, error: null}; 
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/transactions`,
    "POST",
    TOKEN_HEADER,
    body
  );
  return { data, loading, error };
};

export const getTransactions = (id) => {
  if(id === undefined || id === null) return {data: null, loading: true, error: null}; 
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/transactions/${id}`,
    "GET",
    TOKEN_HEADER
  );
  return { data, loading, error };
};