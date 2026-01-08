import api, { setAuthToken } from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login/", data);
  const { access } = res.data;

  localStorage.setItem("accessToken", access);
  setAuthToken(access);

  return res.data;
};

export const register = async (data) => {
  return await api.post("/auth/register/", data);
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  setAuthToken(null);
};
