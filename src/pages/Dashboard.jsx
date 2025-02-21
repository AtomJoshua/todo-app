import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedFinishedTasks = JSON.parse(localStorage.getItem("finishedTasks")) || [];
    setTasks(storedTasks);
    setFinishedTasks(storedFinishedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
  }, [finishedTasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask }]);
    setNewTask("");
  };

  const finishTask = (id) => {
    const taskToFinish = tasks.find((task) => task.id === id);
    if (taskToFinish) {
      setFinishedTasks([...finishedTasks, taskToFinish]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    navigate("/"); // Redirect to Home
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    if (source.droppableId === "pendingTasks" && destination.droppableId === "finishedTasks") {
      const taskToMove = tasks[source.index];
      const updatedTasks = [...tasks];
      updatedTasks.splice(source.index, 1);

      setTasks(updatedTasks);
      setFinishedTasks([...finishedTasks, taskToMove]);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Dashboard</h1>
        <div className="flex gap-2 sm:gap-4">
          <Link to="/FinishedTasks" className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition">
            Finished Tasks
          </Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition">
             Logout
          </button>
        </div>
      </div>

      {/* Task Input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-gray-100 text-black">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="w-full sm:w-auto p-2 border rounded-md"
        />
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Add
        </button>
      </div>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Pending Tasks */}
          <Droppable droppableId="pendingTasks">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps} className="w-full sm:w-1/2 space-y-3">
                <h2 className="text-lg font-bold mb-2 text-black">Pending Tasks</h2>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex justify-between items-center p-3 border rounded-md bg-white"
                      >
                        <span>{task.title}</span>
                        <div className="flex gap-2">
                          <button onClick={() => finishTask(task.id)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition">
                            Finish
                          </button>
                          <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
                            Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

          {/* Finished Tasks (Droppable) */}
          <Droppable droppableId="finishedTasks">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps} className="w-full sm:w-1/2 space-y-3 bg-gray-200 p-4 rounded-md">
                <h2 className="text-lg font-bold mb-2">Finished Tasks</h2>
                {finishedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 border rounded-md bg-white"
                      >
                        {task.title}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
