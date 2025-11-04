import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminSnippets from "./pages/AdminSnippets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Explore from "./pages/Explore";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Feed />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/snippets" element={<AdminSnippets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
          </Route>

          {/* Utanför layouten */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
