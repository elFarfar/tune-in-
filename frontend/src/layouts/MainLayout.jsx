import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //  Om användaren inte är inloggad → redirect till /login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-3xl pt-24 px-4 flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
