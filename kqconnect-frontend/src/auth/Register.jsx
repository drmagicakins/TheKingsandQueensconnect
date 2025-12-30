// src/auth/Register.jsx
import Input from "../components/Input";
import api from "./authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const payload = Object.fromEntries(form);

    await api.register(payload);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Join The Kings & Queens Connect
        </h1>

        <Input label="Full Name" name="name" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Birthday" name="birthday" type="date" required />
        <Input label="Password" name="password" type="password" required />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Create Account
        </button>
      </form>
    </div>
  );
}
