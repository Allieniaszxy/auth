"use client";
import axios from "axios";
// import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>profile</h1>
      <p>profile page </p>
      <hr />
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 mt-4 text-white font-bold py-2 px-4"
      >
        Logout
      </button>
    </div>
  );
}
