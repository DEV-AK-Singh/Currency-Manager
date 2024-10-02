import React, { useEffect } from "react";

export default function HomePage() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 lg:py-32 py-20">
          <div className="mx-auto max-w-xl text-center py-2">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Currency Manager
              <strong className="font-extrabold text-indigo-700 sm:block">  your money </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Manage your currency data with ease.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
