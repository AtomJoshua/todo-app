import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Taskflow</h1>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none text-2xl"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Nav Links (Desktop & Mobile) */}
        <div className={`md:flex md:items-center ${menuOpen ? "block" : "hidden"} w-full md:w-auto`}>
          <ul className="md:flex md:space-x-6 space-y-4 md:space-y-0 text-center mt-4 md:mt-0">
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-blue-500 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="block py-2 px-4 hover:bg-blue-500 rounded-md">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="block py-2 px-4 hover:bg-blue-500 rounded-md">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
