import React from "react";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "DrJoke", role: "Producer" },
    { id: 2, name: "AnnaKings", role: "A&R" },
    { id: 3, name: "Mando", role: "Artist" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

