import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const store = createContext(null);

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      navigate("/dashboard/profile", { replace: true });
    }
  }, []);

  return (
    <>
      <store.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        <Navbar />
        <Outlet />
        <Footer />
      </store.Provider>
    </>
  );
}
