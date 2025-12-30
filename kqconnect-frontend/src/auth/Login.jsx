// src/auth/Login.jsx
import Input from "../components/Input";
import api from "./authService";
import { useAuthStore } from "./authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const res = await api.login(Object.fromEntries(form));
    login(res.user, res.token);
    navigate("/threads");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>

        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
