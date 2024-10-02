import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

const UpiRecord = ({ name, phone, upi, redirectUtil }) => {
  const [upiIdCopied, setUpiIdCopied] = useState(false);

  useEffect(() => {
    if (upiIdCopied) {
      setTimeout(() => {
        setUpiIdCopied(false);
      }, 500);
    }
    window.navigator.clipboard.writeText(upi);
  }, [upiIdCopied]);

  return (
    <tr className="cursor-pointer">
      <td
        className="whitespace-nowrap px-4 py-2 text-gray-900 text-left"
        onClick={() => {
          redirectUtil(`/dashboard/pay/${upi}`);
        }}
      >
        <span className="font-medium">{name}</span>
        <br />
        <span className="font-light text-xs">{phone}</span>
      </td>
      <td
        className="whitespace-nowrap px-4 py-2 text-gray-700 text-right relative"
        onClick={() => {
          setUpiIdCopied(true);
        }}
      >
        <span className="font-bold">UPI-ID:</span> {upi}
        <i className="fa-regular fa-copy ms-2"></i>
        {upiIdCopied ? (
          <span className="absolute top-5 right-8 bg-black text-white rounded-lg text-xs p-2 transition-all duration-500">
            Copied!!
          </span>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default function UsersList() {
  const navigate = useNavigate();
  const redirectUtil = (path) => {
    navigate(path, { replace: true });
  };

  const { data, loading, error } = getUsers();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error occurred! {error.message}</div>;
  }

  const users = data?.users;
  console.log(users);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          {/* <thead className="text-left rtl:text-right ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Phone</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">UPI-ID</th>
            </tr>
          </thead> */}

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <UpiRecord
                key={user._id}
                name={user.name}
                phone={user.phone}
                upi={user.upiId}
                redirectUtil={redirectUtil}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
