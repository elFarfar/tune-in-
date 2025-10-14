import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className=" text-white items-center  ">
      <ul className="space-y-9">
        <li>
          <Link to="/admin/users" className="hover:text-indigo-400">
            {" "}
            👥 Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/snippets" className="hover:text-indigo-400">
            {" "}
            🎶 Manage Snippets
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:text-indigo-400">
            {" "}
            🏠 Back to Feed{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
