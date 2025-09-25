"use client";
import React from "react";
import axios from "axios";
// import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [data, setData] = React.useState("nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/server/api/users/logout");
      toast.success("Logout successful");
      router.push("/client/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/server/api/users/me");
      setData(response.data.data._id);
      console.log(response.data.data);
      toast.success("User details fetched");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>profile</h1>
      <p>profile page </p>
      <hr />
      <h2 className="mt-4 text-lg p-2 border text-white">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/client/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 mt-4 text-white font-bold py-2 px-4"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-green-600 mt-4 text-white font-bold py-2 px-4"
      >
        User Details
      </button>
    </div>
  );
}
