// ChatWindow.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

const ChatWindow = ({ selectedFriendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!selectedFriendId) return;

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [selectedFriendId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        senderId: auth.currentUser.uid,
        receiverId: selectedFriendId,
        text: newMessage,
        timestamp: serverTimestamp(),
      });

      console.log("Message sent with ID: ", docRef.id);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white mt-20">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="m-2">
            {message.senderId === auth.currentUser.uid ? (
              <div className="text-right">
                <br></br>
                {message.text}
                <br></br>
                {new Date(message?.timestamp?.toDate())?.toUTCString()}
              </div>
            ) : (
              <div className="text-left">
                {message.text}
                <br></br>
                {new Date(message?.timestamp?.toDate())?.toUTCString()}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
