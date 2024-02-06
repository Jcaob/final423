import React, { useContext } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";

const UserLinks = () => {
  const { signOutUser, user, userData } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div className="mx-4 flex items-center" onClick={signOutUser}>
        <Tooltip content="Sign Out" placement="bottom">
          <Avatar
            src={user?.photoURL || avatar}
            size="sm"
            alt="avatar"
          ></Avatar>
        </Tooltip>
        <p className="mx-4 font-serif text-sm text-black font-medium no-underline capitalize">
          {user?.displayName === null && userData?.name !== undefined
            ? userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1)
            : user?.displayName?.split(" ")[0]}
        </p>
      </div>
    </div>
  );
};

export default UserLinks;
