import React, { useState } from "react";
import waterSlide from "../../assets/images/waterslide.jpg";

const RightSide = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={waterSlide} alt="nature" />
      </div>
      <p className="font-serif font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2 text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim mollitia
        natus repudiandae architecto nemo veniam nulla quibusdam? Deleniti
        laboriosam animi ab libero rerum facilis repellendus corrupti aut
        delectus. Eius, facilis?
      </p>
      <div className="mx-2 mt-10">
        <p className="font-serif font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends:
        </p>
        <input
          className="border-0 outline-none mt-4"
          placeholder="Search Friends"
          name="input"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RightSide;
