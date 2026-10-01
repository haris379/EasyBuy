import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import LoadingBar from "./LoadingBar";

const ProfileCard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUsers = async () => {
    try {
      const response = await api.get("/user/all-users");

      const updatedUsersArray = response.data.users.filter((user: any) => {
        return user.isVerified === true && user.role === "user";
      });

      setUsers(updatedUsersArray || []);
    } catch (error) {
      console.error("Error Getting Users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingBar />
        </div>
      ) : users.length === 0 ? (
        <p className="font-bold text-center m-2">No User</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {users.map((user: any) => (
            <div
              key={user._id}
              className="w-full bg-[#FFF9F2] rounded-xl border p-4 flex flex-col"
            >
              <h2 className="text-center font-bold text-lg mb-4">
                User Profile
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex items-start">
                  <span className="font-bold w-16 shrink-0">Name:</span>

                  <span className="font-semibold break-all">{user.name}</span>
                </div>

                <div className="flex items-start">
                  <span className="font-bold w-16 shrink-0">Email:</span>

                  <span className="font-semibold break-all">{user.email}</span>
                </div>
              </div>

              <Link
                to={`/login-id/${user._id}`}
                state={{
                  name: user.name,
                  email: user.email,
                }}
                className="w-auto py-3 bg-[#7A1F3D] hover:bg-[#92284A]  text-white font-semibold rounded-lg text-center transition duration-200"
              >
                Login
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileCard;
