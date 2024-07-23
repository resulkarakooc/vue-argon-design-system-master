// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8084/api/user', // Temel API URL'i
  timeout: 1000, // İsteğin zaman aşımı süresi
});

export default instance;
