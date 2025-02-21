import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="p-6 bg-gray-100 rounded" onSubmit={handleRegister}>
        <h2 className="text-xl">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mt-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mt-2 border"
        />
        <button className="bg-blue-500 text-white p-2 mt-4 w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;