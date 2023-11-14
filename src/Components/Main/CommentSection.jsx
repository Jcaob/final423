import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Avatar, Input } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { AuthContext } from "../AppContext/AppContext";
import {
  collection,
  doc,
  orderBy,
  serverTimestamp,
  setDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  postActions,
  postReducer,
  postsStates,
} from "../AppContext/postReducer";
import Comment from "./Comment";
const CommentSection = ({ postID }) => {
  const comment = useRef("");
  const { user, userData } = useContext(AuthContext);
  const commentRef = doc(collection(db, "posts", postID, "comments"));
  const [state, dispatch] = useReducer(postReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current.value,
          image: user?.photoURL,
          name:
            user?.displayName?.split(" ")[0] ||
            userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice(1),
          timestamp: serverTimestamp(),
        });
        comment.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postID}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENT,
            comments: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        console.log(err);
      }
    };

    return () => getComments();
  }, [postID, ADD_COMMENT, HANDLE_ERROR]);
  return (
    <div className="flex flex-col bg-white w-full py-2 rounded-b-3xl">
      <div className="flex items-center">
        <div className="mx-2">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL || avatar}
          ></Avatar>
        </div>
        <div className=" w-full pr-2">
          <form onSubmit={addComment} className="flex items-center w-full">
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="w-full rounded-2xl outline-none border-0 p-2 bg-gray-100"
              ref={comment}
            ></input>
            <button type="submit" className=" hidden">
              Submit
            </button>
          </form>
        </div>
      </div>
      {state.comments?.map((comment, index) => {
        return (
          <Comment
            key={index}
            image={comment.image}
            name={comment.name}
            comment={comment.comment}
          ></Comment>
        );
      })}
    </div>
  );
};

export default CommentSection;
