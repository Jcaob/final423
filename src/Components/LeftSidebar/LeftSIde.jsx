import React from "react";
import nature from "../../assets/images/nature.jpg";
import { Avatar, Tooltip } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import job from "../../assets/images/job.png";

const LeftSIde = () => {
  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img className="h-28 w-full rounded-r-xl" src={nature} alt="nature" />
        <div className="absolute -bottom-4">
          <Tooltip content="Profile" placement="top">
            <Avatar size="md" src={avatar} alt="avatar"></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-6">
        <p className="font-serif font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
          User Email
        </p>
        <p className="font-serif font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
          Access Exclusive tools & insights
        </p>
        <p className="font-serif font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
          Try Premium for free
        </p>
      </div>
      <div className="flex flex-col items-center pl-2">
        <div className="flex items-center pb-4"></div>
        <img className="h-10" src={job} alt="job" />
      </div>
    </div>
  );
};

export default LeftSIde;
