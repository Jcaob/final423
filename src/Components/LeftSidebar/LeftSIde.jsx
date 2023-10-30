import React from "react";
import nature from "../../assets/images/nature.jpg";
import { Avatar, Tooltip } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import job from "../../assets/images/job.png";
import location from "../../assets/images/location.png";
import facebook from "../../assets/images/facebook.png";
import twitter from "../../assets/images/twitter.png";

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
      <div className="flex flex-col pl-2">
        <div className="flex items-center pb-4">
          <img className="h-10" src={job} alt="job" />
          <p className=" font-serif font-bold text-lg no-underline tracking-normal leading-none">
            React Developer
          </p>
        </div>
        <div className="flex items-center">
          <img className="h-10" src={location} alt="location" />
          <p className=" font-serif font-bold text-lg no-underline tracking-normal leading-none">
            Indiana
          </p>
        </div>
        <div className="flex justify-center items-center pt-4">
          <p className=" font-serif font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Events
          </p>
          <p className=" font-serif font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            Groups
          </p>
          <p className=" font-serif font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Follow
          </p>
          <p className=" font-serif font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            More
          </p>
        </div>
        <div className=" ml-2">
          <p className=" font-serif font-bold text-lg no-underline tracking-normal leading-none py-2">
            Social Profiles
          </p>
          <div className="flex items-center">
            <img className=" h-10 mb-3 mr-2" src={facebook} alt="Facebook" />
            <p className=" font-serif font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-normal py-2">
              Social Network
            </p>
          </div>
          <div className="flex items-center">
            <img className=" h-10 mb-3 mr-2" src={twitter} alt="Twitter" />
            <p className=" font-serif font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-normal py-2">
              Social Network
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
        <p className=" font-serif font-bold text-lg no-underline tracking-normal leading-none py-2">
          Random Ads
        </p>
        <div className=" bg-blue-600 rounded-xl h-1 mb-4"></div>
      </div>
    </div>
  );
};

export default LeftSIde;
