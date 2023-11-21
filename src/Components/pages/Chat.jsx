import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar/NavBar";
import FriendList from "../Chat/FriendList";
const Chat = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/chat");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>

      <div className="flex bg-gray-100 ">
        <div className="flex-auto w-[20%] fixed top-12">
          <FriendList></FriendList>
        </div>
      </div>
    </div>
  );
};

export default Chat;
