"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/server/api/users/login", user);
      console.log("Login successful", response.data);
      if (response.status === 200) {
        toast.success("Login successful!");

        router.push("/client/profile");
      } else {
        console.error("Login failed:", response.data);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
    // Implement login logic here
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        {loading ? "processing ...." : "Login"}
      </h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <fieldset className="text-black">Email</fieldset>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-500 rounded text-black"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <fieldset className="text-black">Password</fieldset>
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-500 rounded text-black"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {buttonDisabled ? "Loading..." : "Login"}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/client/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
