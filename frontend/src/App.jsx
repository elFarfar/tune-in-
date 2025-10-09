import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminSnippets from "./pages/AdminSnippets";
import Profile from "./pages/Profile";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/Users" element={<AdminUsers />} />
        <Route path="/Admin/Snippets" element={<AdminSnippets />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
