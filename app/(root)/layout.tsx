import React from "react";
import Navbar from "../../components/Navbar";
import { Toaster } from "sonner";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar></Navbar>
      {children}
      <Toaster></Toaster>
    </main>
  );
};

export default Layout;
