import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FinishedTasks = () => {
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    const storedFinishedTasks = JSON.parse(localStorage.getItem("finishedTasks")) || [];
    setFinishedTasks(storedFinishedTasks);
  }, []);

  const clearFinishedTasks = () => {
    localStorage.removeItem("finishedTasks");
    setFinishedTasks([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors">
      <h2 className="text-2xl font-bold mb-4">Finished Tasks</h2>
      
      {finishedTasks.length === 0 ? (
        <p className="text-lg text-gray-500 mb-4">No finished tasks yet.</p>
      ) : (
        <ul className="mb-4">
          {finishedTasks.map((task) => (
            <li key={task.id} className="p-2 border rounded-md mb-2 dark:border-gray-700">
              {task.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>

        {finishedTasks.length > 0 && (
          <button
            onClick={clearFinishedTasks}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
          >
            Clear Finished Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default FinishedTasks;
