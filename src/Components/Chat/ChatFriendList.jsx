import React, { useState, useContext } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import avatar from "../../assets/images/avatar.jpg";
import { db } from "../firebase/firebase";
import remove from "../../assets/images/delete.png";

const ChatFriendList = ({ friendList, setInput, onFriendClick }) => {
  const { user, userData } = useContext(AuthContext);
  const FL = userData?.friends;

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div className="mx-2 mt-10">
      {FL?.length > 0 ? (
        FL.map((friend) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
            key={friend.id}
          >
            <div
              className="flex items-center my-2 cursor-pointer"
              onClick={() => {
                onFriendClick(friend.id); // Call the onFriendClick function
              }}
            >
              <Avatar
                size="sm"
                variant="circular"
                src={friend?.image || avatar}
                alt="avatar"
              />
              <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                {friend.name}
              </p>
            </div>

            <div className="mr-4">
              <img
                onClick={() =>
                  removeFriend(friend.id, friend.name, friend.image)
                }
                className="cursor-pointer"
                src={remove}
                alt="deleteFriend"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Add friends to check their profile
        </p>
      )}
    </div>
  );
};

export default ChatFriendList;
