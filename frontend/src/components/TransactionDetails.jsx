import React from "react";
import { useLocation } from "react-router-dom";

export default function TransactionDetails() {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <div className="h-full w-full bg-white">
        <div className={`p-4 ${state.status == "success" ? "bg-green-500" : "bg-red-500"}`}>
          <h1 className="text-center font-bold font-mono text-white">
            Transaction {state.status}
          </h1>
          <p className="text-center text-xs font-semibold text-white">
            {new Date(state.transactionDate).toLocaleString("hi-IN")}
          </p>
        </div>
        <hr />
        <div className="p-4">
          <h1 className="text-xs font-semibold">{state.status === "success" ? (state.type === "credit" ? "Received from" : "Paid to") : "Payment to"}</h1>
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">{state.name}</h2>
              <p className="text-sm font-semibold">{state.upi}</p>
            </div>
            <div>
              <h1 className="font-bold text-end">Rs. {state.amount}</h1>
              <p className="text-xs font-semibold text-end">{state.status === "success" ? (state.type === "credit" ? "Credited" : "Debited") : <span className="font-bold text-red-600">Failed!</span>}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-4">
          <h1 className="text-sm font-bold mb-2">Payment Details</h1>
          <div className="font-mono">
            <div>
              <p className="text-xs font-semibold">Transaction ID</p>
              <h2 className="font-bold">{state.transactionId}</h2>
            </div>
            <hr className="my-2" />
            <div>
              <p className="text-xs font-semibold">Transaction Time</p>
              <h2 className="font-bold">{new Date(state.transactionDate).toLocaleString("hi-IN")}</h2>
            </div>
            <hr className="my-2" />
            <div>
              <p className="text-xs font-semibold">Transaction Status</p>
              <h2 className="font-bold">{state.status=="success" ? "Success" : "Failed"}</h2>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-4 flex justify-between items-center cursor-pointer">
          <h1 className="text-sm font-bold">
            <i className="fa-regular fa-circle-question me-2"></i>Contact
            Support
          </h1>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <hr />
      </div>
    </>
  );
}
