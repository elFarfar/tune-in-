import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl front-bold mb-8 text-center">Admin</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/users" className="block-hover:text-indigo-400">
            {" "}
            👥 Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/snippets" className="block-hover:text-indigo-400">
            {" "}
            🎶 Manage Snippets
          </Link>
        </li>
        <li>
          <Link to="/" className="block-hover:text-indigo-400">
            {" "}
            🏠 Back to Feed{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
