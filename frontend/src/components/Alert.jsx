import React from "react";

export default function Alert({ message }) {
  return (
    <>
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white p-4 mx-auto w-[384px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="flex items-start gap-4 w-full">
          <span>
            {message?.type === "success" ? (
              <i className="fa-solid fa-circle-check text-green-600"></i>
            ) : (
              <i className="fa-solid fa-circle-exclamation text-red-600"></i>
            )}
          </span>
          <div className="flex-1">
            <strong className="block font-medium text-gray-900">
              {message?.type === "success" ? "Success!" : "Error!"}
            </strong>
            <p className="mt-1 text-sm text-gray-700">{message?.message}</p>
          </div>
          <button className="text-gray-500 transition hover:text-gray-600">
            <span className="sr-only">Dismiss popup</span>{" "}
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </>
  );
}
