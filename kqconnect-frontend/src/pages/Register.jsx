import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <AuthCard
      title="Join the Circle ✨"
      subtitle="Become part of The Kings and Queens Connect"
    >
      <form className="space-y-4">
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />

        <button className="w-full mt-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
          Create Account
        </button>
      </form>

      <p className="text-sm text-gray-300 text-center mt-6">
        Already a member?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
