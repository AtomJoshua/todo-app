import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Your Tasks</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-4">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;