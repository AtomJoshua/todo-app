import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // ✅ Parse JSON properly
    if (user && user.token) { // ✅ Ensure user exists & has a token
      navigate("/dashboard", { replace: true }); // ✅ Use replace to prevent back navigation
    }
  }, [navigate]); // ✅ Dependency array includes navigate to prevent unnecessary calls

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Taskflow</h1>
      <h1 className="text-3xl font-bold mb-4">Manage and track all your tasks with ease!</h1>
      <div className="space-x-4">
        <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md">Login</a>
        <a href="/register" className="px-4 py-2 bg-green-500 text-white rounded-md">Register</a>
      </div>
    </div>
  );
};

export default Home;
