import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminSnippets from "./pages/AdminSnippets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin-routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/snippets" element={<AdminSnippets />} />

        {/* Auth-sidor */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
