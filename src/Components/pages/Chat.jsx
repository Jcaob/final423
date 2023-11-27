import React, { useState } from "react";
import Navbar from "../Navbar/NavBar";
import ChatFriendList from "../Chat/ChatFriendList";
import ChatWindow from "../Chat/ChatWindow"; // Import the ChatWindow component

const Chat = () => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const handleFriendClick = (friendId) => {
    setSelectedFriendId(friendId);
  };

  return (
    <div className="w-full flex">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar />
      </div>
      <div className="flex w-full">
        <div className="flex-auto w-[20%] fixed top-12">
          <ChatFriendList onFriendClick={handleFriendClick} />
        </div>
        {selectedFriendId && (
          <div className="flex-auto ml-[450px] ">
            <ChatWindow selectedFriendId={selectedFriendId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
