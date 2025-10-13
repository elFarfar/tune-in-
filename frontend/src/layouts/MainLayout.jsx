import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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
