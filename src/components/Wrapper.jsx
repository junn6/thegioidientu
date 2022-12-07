// Import library
import React from "react";
import { Outlet } from "react-router-dom";

// Import components
import Sidebar from "./Sidebar";

const Wrapper = () => {
    return (
        <main className="wrapper">
            <Sidebar />
            <section className="section">
                <Outlet />
            </section>
        </main>
    );
};

export default Wrapper;
