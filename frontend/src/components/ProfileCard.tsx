import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ProfileCard = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await api.get("/user/all-users");
      const updatedUsersArray = response.data.users.filter((user: any) => {
        return user.isVerified === true;
      });

      // setUsers(response.data.users || []);
      setUsers(updatedUsersArray || []);
    } catch (error) {
      console.error("Error Getting Users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {users.length === 0 && <p>No users found</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-3">
        {users.map((user: any) => (
          <div
            className=" bg-gray-300  h-auto w-auto rounded-xl border flex flex-col justify-between"
            key={user._id}
          >
            <h2 className="text-center m-2 font-bold">User Profile</h2>
            <div className="m-4 font-semibold">
              <p>
                <span className="font-bold">Name</span> : {user.name}
              </p>
              <p>
                <span className="font-bold">Email</span> : {user.email}
              </p>
            </div>
            <div className="text-center m-2">
              <Link
                to={`/login-id/${user._id}`}
                state={{ name: user.name, email: user.email }}
                className="inline-block w-60 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
              >
                Login
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileCard;
