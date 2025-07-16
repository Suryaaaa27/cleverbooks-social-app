// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // NestJS backend URL
});

export default api;
