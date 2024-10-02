import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import Alert from "../components/Alert";

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    // console.log("Phone:", phone);
    // console.log("Password:", password);
    // navigate("/dashboard", { replace: true });
    try {
      const userData = { phone, password };
      const response = await loginUser(userData);
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setMessage({message:'Login successful!',type:'success'});
      console.log('Login response:', response);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2500);
    } catch (error) {
      setMessage({message:'Login failed!',type:'error'});
      console.error('Error logging:', error);
    }
  }
  
  useEffect(() => {
    if(message?.message){
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }, [message]);

  return (
    <>
      {
        message ? <Alert message={message} /> : "" 
      }
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Log in to your account
          </h1>
          <p className="mt-4 text-gray-500">
            Start creating your account and take control of your money.
          </p>
        </div>
        <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>

            <div className="relative">
              <input
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter phone number"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Don't have an account? 
              <Link to="/register" className="underline ms-2">
                Sign up
              </Link>
            </p>

            <button
              onClick={handleLogin}
              className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
