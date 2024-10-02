import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../services/api";

const UpiComponent = ({user}) => {
  const [upiIdCopied, setUpiIdCopied] = useState(false);
  useEffect(() => {
    if (upiIdCopied) {
      setTimeout(() => {
        setUpiIdCopied(false);
      }, 500);
    }
    window.navigator.clipboard.writeText(user?.upiId);
  }, [upiIdCopied]);

  return (
    <p
      className="text-sm font-medium text-gray-500 relative cursor-pointer"
      onClick={() => {
        setUpiIdCopied(true);
      }}
    >
      <span className="font-bold">UPI-ID:</span> {user?.upiId}{" "}
      <i className="fa-regular fa-copy ms-2"></i>
      {upiIdCopied ? (
        <span className="absolute top-5 right-8 bg-black text-white rounded-lg text-xs p-2 transition-all duration-500">
          Copied!!
        </span>
      ) : (
        ""
      )}
    </p>
  );
}

export default function UserProfile() {
  const savedUser = JSON.parse(localStorage.getItem("user") ?? "");
  
  const { data, loading, error } = getUser(savedUser?._id);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error occurred! {error.message}</div>;
  }

  const user = data?.user;
  console.log(user);

  return (
    <>
      <article className="rounded-lg border border-gray-100 bg-white p-6">
        <div className="flex items-center">
          <span className="rounded-full bg-blue-100 p-6 text-blue-600 flex items-center me-4">
            <i className="fa-regular fa-user h-12 w-12"></i>
          </span>
          <div>
            <UpiComponent user={user}/>
            <p className="text-2xl text-gray-900 font-light">{user?.name}</p>
            <p className="text-sm font-normal text-gray-900">
              <span className="font-semibold">Phone:</span> {user?.phone}
            </p>
            <p className="text-xs font-medium text-gray-900">
              <span className="font-bold">Status:</span>{" "}
              <span className="inline-flex text-green-600">{user?.status}</span>
            </p>
          </div>
        </div>
      </article>
      <article className="rounded-lg border border-gray-100 bg-white px-6 py-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total <b>Sent</b> Amount
            </p>
            <p className="text-xl font-medium text-gray-900">₹240.94</p>
            <div className="mt-1 flex gap-1 text-green-600">
              <p className="flex gap-2 text-xs">
                <span className="font-medium">
                  <i className="fa-solid fa-arrow-trend-up"></i> 67.81%{" "}
                </span>
                <span className="text-gray-500"> Since last week </span>
              </p>
            </div>
          </div>
          <span className="rounded-full bg-blue-100 p-4 text-red-600 flex items-center">
            <i className="fa-solid fa-upload w-6 h-6"></i>
          </span>
        </div>
      </article>
      <article className="rounded-lg border border-gray-100 bg-white px-6 py-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total <b>Received</b> Amount
            </p>
            <p className="text-xl font-medium text-gray-900">₹240.94</p>
            <div className="mt-1 flex gap-1 text-red-600">
              <p className="flex gap-2 text-xs">
                <span className="font-medium">
                  <i className="fa-solid fa-arrow-trend-down"></i> 67.81%{" "}
                </span>
                <span className="text-gray-500"> Since last week </span>
              </p>
            </div>
          </div>
          <span className="rounded-full bg-blue-100 p-4 text-green-600 flex items-center">
            <i className="fa-solid fa-download w-6 h-6"></i>
          </span>
        </div>
      </article>
      <article className="rounded-lg border border-gray-100 bg-white px-6 py-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-medium text-gray-900">Balance Amount</p>
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-900">
              ₹{user?.balance}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
