import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, Folder, User, Settings, UserPlus, LogOut, ListChecks, Menu } from "lucide-react";

function Navbar({ handleSignOut, isAuth }) {
  const [active, setActive] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track if sidebar is open

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Folders", icon: Folder, path: "/folders" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Admin", icon: Settings, path: "/admin" },
  ];

  return (
    <div className="relative">
      {/* Hamburger Button for Small Screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-950 text-white rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block h-screen w-64 bg-slate-950 text-white shadow-lg flex flex-col p-5 fixed transition-all`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <img className="w-10 h-10" src="favicon.ico" alt="Logo" />
          <h2 className="text-xl font-bold">Taskly</h2>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setActive(item.name)}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  active === item.name ? "bg-slate-800 text-blue-600" : "hover:bg-slate-700"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="mt-auto flex flex-col gap-3">
          {!isAuth ? (
            <>
              <Link to="/signup">
                <button className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg hover:bg-slate-700 w-full">
                  <UserPlus size={20} />
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg hover:bg-slate-700 w-full">
                  <UserPlus size={20} />
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/tasks">
                <button className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg hover:bg-slate-700 w-full">
                  <ListChecks size={20} />
                  Tasks
                </button>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 bg-red-600 p-3 rounded-lg hover:bg-red-500 w-full"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Navbar;
