export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      User Profile
      <p>
        {" "}
        Profile page of{" "}
        <span className="p-2 bg-amber-400 text-white">{params.id}</span>
      </p>
    </div>
  );
}
