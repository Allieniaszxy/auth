"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/server/api/users/signup", user);
      console.log("Signup response:", response.data);
      if (response.status === 200) {
        router.push("/client/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        {loading ? "Processing -----" : "SignUp"}
      </h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <fieldset className="text-black">Username</fieldset>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border border-gray-500 rounded text-black"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {buttonDisabled ? "Fill all fields" : "Signup"}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/client/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
