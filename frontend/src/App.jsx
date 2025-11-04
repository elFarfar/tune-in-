import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminSnippets from "./pages/AdminSnippets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Explore from "./pages/Explore";
import CreatePost from "./pages/CreatePosts";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth(); 
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Feed />} />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <Admin /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/users"
          element={user?.role === "admin" ? <AdminUsers /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin/snippets"
          element={user?.role === "admin" ? <AdminSnippets /> : <Navigate to="/" replace />}
        />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" replace />} />
      </Route>

      {/* Outside layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
