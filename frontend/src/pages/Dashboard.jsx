import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getUser, getUsers, updateUser, deleteUser, createTransaction, getTransactions } from "../services/api";

export default function Dashboard() {
  const activeClass = "shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-sky-600 w-1/4 text-center";
  const baseClass = "shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700 w-1/4 text-center";
  const url = window.location.pathname;
  if(url === "/dashboard" || url === "/dashboard/") {
    window.location.href = "/dashboard/profile";
  }
  // const { data, loading, error } = getUsers();
  // const { data, loading, error } = getUser("66fc182065e493baadca263f");
  // const { data, loading, error } = updateUser("66fc182065e493baadca263f", {name: "Abhishek", balance: 1000});
  // const { data, loading, error } = deleteUser("66fc563809eed2a89b37e7b4");
  // const { data, loading, error } = createTransaction({ fromUser: "7999456558#aks#bank", toUser: "9993733042#aks#bank", amount: 1000 });
  // const { data, loading, error } = getTransactions("66fc182065e493baadca263f");
  // console.log(data, loading, error);
  return (
    <>
      <div>
        <div className="max-w-md sm:max-w-xl mx-auto py-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-evenly">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => (isActive) ? activeClass : baseClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/contact"
                className={({ isActive }) => (isActive) ? activeClass : baseClass}
              >
                Contact
              </NavLink>

              <NavLink
                to="/dashboard/pay"
                className={({ isActive }) => (isActive) ? activeClass : baseClass}
              >
                Pay Money
              </NavLink>

              <NavLink
                to="/dashboard/history"
                className={({ isActive }) => (isActive) ? activeClass : baseClass}
              >
                History
              </NavLink>
            </nav>
          </div>
          <div className="bg-gray-100 p-4 h-[500px] overflow-y-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
