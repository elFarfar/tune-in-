import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6 text-center">
      {user ? (
        <>
          <h1 className="text-xl font-bold">Welcome, {user.username}</h1>
          <p>Role: {user.role}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p>You’re not logged in.</p>
      )}
    </div>
  );
}
