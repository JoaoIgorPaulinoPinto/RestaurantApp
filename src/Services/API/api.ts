// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.16:3000", // URL base da sua API
  // ou a URL do seu servidor, ex: https://meuservidor.com/api
});

// // Exemplo de interceptador (opcional) para token JWT:
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
