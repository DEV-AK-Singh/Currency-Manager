import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TransactionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { upiId: number } = useParams();
  const upiIdValue = number ? number + location.hash : null;
  const [upiId, setUpiId] = useState(upiIdValue ?? "");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handlePay = () => {
    const savedUser = JSON.parse(localStorage.getItem("user") ?? "");
    const data = {
      fromUser: savedUser?.upiId,
      toUser: upiId,
      amount: amount,
      message: message,
    };
    if(upiId && amount){
      if(upiId == savedUser?.upiId){
        alert("You can't send money to yourself!");
        return;
      }
      navigate(`/dashboard/pay/payment`, { replace: true, state: data });
    }else{
      alert("Mandatory fields are missing!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <input
            type="text"
            name="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter UPI-ID here..."
          />
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-4"
            placeholder="Enter Amount here..."
          />
          <textarea
            type="text"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-4 resize-none"
            placeholder="Enter Message here... (optional)"
          />
        </div>
        <input
          onClick={handlePay}
          type="button"
          value="Pay Now"
          className="w-full rounded-lg border-gray-200 bg-indigo-600 text-white p-4 pe-12 text-sm shadow-sm mt-4 cursor-pointer"
          placeholder="Enter password"
        />
      </div>
    </>
  );
}
