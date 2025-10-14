import React from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function Admin() {
  return (
    <div className="flex">

      {/*Main Content*/}
      <div className="flex-1 ">
        <h1 className="text-3xl front-bold mb-6">Admin Dashboard</h1>
      {/* Sidebar*/}
      <AdminSidebar />
      </div>

     
    </div>
  );
}
