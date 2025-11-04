import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "artist",
  });
  const [message, setMessage] = useState("");

  // Ladda users automatiskt när admin loggar in
  useEffect(() => {
    if (user?.token) fetchUsers();
  }, [user]);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch users error:", error.response?.data || error);
    }
  };

  // ADD NEW USER
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/users", newUser);
      setMessage(res.data.message);
      setNewUser({ username: "", email: "", password: "", role: "artist" });
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating user");
    }
  };

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error);
    }
  };

  // UPDATE ROLE
  const handleRoleChange = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      fetchUsers();
    } catch (error) {
      console.error("Role update error:", error.response?.data || error);
    }
  };

  if (user?.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        Admin Panel
      </h1>

      {/* BUTTON TO LOAD USERS */}
      <div className="mb-4 text-center">
        <button
          onClick={fetchUsers}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
        >
          Load Users
        </button>
      </div>

      {/* ADD NEW USER */}
      <form
        onSubmit={handleAddUser}
        className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold">Add New User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="p-2 rounded text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="p-2 rounded text-black"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="p-2 rounded text-black"
        >
          <option value="artist">Artist</option>
          <option value="producer">Producer</option>
          <option value="A&R">A&R</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          Add User
        </button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>

      {/* ALL USERS */}
      <h2 className="text-2xl font-semibold mb-3">All Users</h2>
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-gray-400 text-sm">{u.email}</p>
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                className="text-black p-1 rounded"
              >
                <option value="artist">Artist</option>
                <option value="producer">Producer</option>
                <option value="A&R">A&R</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDelete(u._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
