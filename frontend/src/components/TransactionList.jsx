import React from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../services/api";

const TransactionRecord = ({name,phone,upi,amount,type,time,redirectUtil,data}) => {
  return (
    <tr onClick={() => {redirectUtil(`/dashboard/history/${upi}`,{...data,name,phone,upi,amount,type})}} className="cursor-pointer">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
        <span className="text-xs"><b>{data.status === "success" ? (type === "credit" ? "Received from" : "Paid to") : "Payment to"}</b> | {phone}</span><br />
        <span className="font-bold">{name}</span><br />
        <span className="text-xs">{new Date(time).toLocaleString("hi-IN")}</span><br />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-right">
        <span className="font-semibold text-lg">₹{amount}</span><br />
        <span className="text-xs">{data.status === "success" ? (type === "credit" ? "Credited" : "Debited") : <span className="font-bold text-red-600">Failed!</span>}</span>
      </td>
    </tr>
  );
};

export default function TransactionList() {
  const navigate = useNavigate();
  const redirectUtil = (path, data) => {
    navigate(path, { replace: true, state : data}); 
  }

  const savedUser = JSON.parse(localStorage.getItem("user") ?? "");
  const { data, loading, error } = getTransactions(savedUser?._id);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error occurred! {error.message}</div>;
  }

  const transactions = data?.transactions;
  console.log(transactions);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          {/* <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-right">Amount</th>
            </tr>
          </thead> */}
          <tbody className="divide-y divide-gray-200">
            {
              transactions?.map((transaction) => {
                return (
                  (transaction?.fromUser?._id == savedUser?._id) ?
                  <TransactionRecord
                    key={transaction?._id}
                    name={transaction?.toUser?.name}
                    phone={transaction?.toUser?.phone}
                    upi={transaction?.toUser?.upiId}
                    amount={transaction?.amount}
                    type={"debit"}
                    time={transaction.transactionDate}
                    redirectUtil={redirectUtil}
                    data={transaction}
                  />
                  :
                  <TransactionRecord
                    key={transaction?._id}
                    name={transaction?.fromUser?.name}
                    phone={transaction?.fromUser?.phone}
                    upi={transaction?.fromUser?.upiId}
                    amount={transaction?.amount}
                    type={"credit"}
                    time={transaction.transactionDate}
                    redirectUtil={redirectUtil}
                    data={transaction}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
