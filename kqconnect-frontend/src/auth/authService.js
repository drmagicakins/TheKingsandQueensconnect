// src/auth/authService.js
import api from "../services/api";

export default {
  register: (data) =>
    api.post("/auth/register/", data).then((res) => res.data),

  login: (data) =>
    api.post("/auth/login/", data).then((res) => res.data),
};
