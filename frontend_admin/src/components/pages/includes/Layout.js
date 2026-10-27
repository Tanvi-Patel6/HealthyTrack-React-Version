import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Layout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
