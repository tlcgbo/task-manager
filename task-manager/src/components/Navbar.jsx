import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BarChart, Calendar, Folder, User, Settings } from "lucide-react";

function Navbar() {
  const [active, setActive] = useState("Tasks");

  const menuItems = [
    { name: "Tasks", icon: Home,},
    { name: "Reporting", icon: BarChart },
    { name: "Calendar", icon: Calendar },
    { name: "Folders", icon: Folder },
    { name: "Profile", icon: User },
    { name: "Admin", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-950 text-white shadow-lg p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        
        <img className="w-10 h-10" src="favicon.ico" alt="" />
        <h2 className="text-xl font-bold">Taskly</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center justify-between p-3 rounded-lg ${
              active === item.name ? "bg-slate-800 text-blue-600" : "hover:bg-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span>{item.name}</span>
            </div>
         
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Navbar;
