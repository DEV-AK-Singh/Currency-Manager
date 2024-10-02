import React from "react";
import { createTransaction } from "../services/api";
import { useLocation } from "react-router-dom";

export default function TransactionPage() {
  const { state } = useLocation();
  const { data, loading, error } = createTransaction(state);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error occurred! {error.message}</div>;
  }
  console.log(data);
  return <div>Transaction Successful</div>;
}
