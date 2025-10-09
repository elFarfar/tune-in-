import React from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function Admin() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar*/}
      <AdminSidebar />

      {/*Main Content*/}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl front-bold mb-6">Admin Dashboard</h1>
      </div>

      {/*MOCK DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-indigo-600">128</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Total snippets</h2>
          <p className="text-2xl font-bold text-indigo-600">130</p>
        </div>
      </div>
    </div>
  );
}
