import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="p-6 bg-gray-100 rounded" onSubmit={handleLogin}>
        <h2 className="text-xl">Login</h2>
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
        <button className="bg-blue-500 text-white p-2 mt-4 w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
