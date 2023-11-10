import React, {
  useRef,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { Avatar, progress } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import live from "../../assets/images/live.png";
import smile from "../../assets/images/smile.png";
import addImage from "../../assets/images/add-image.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  setDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  postActions,
  postsStates,
  postReducer,
} from "../AppContext/postReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { type } from "@testing-library/user-event/dist/type";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(postReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const storage = getStorage();

  const submitImage = () => {
    const fileType = metadata.contentType.includes(file["type"]);
    console.log("file", file);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `image/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        alert(err.message);
        dispatch({ type: HANDLE_ERROR });
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc.docs.map((item) => item.data()),
        });
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };

    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            size="sm"
            variant="circular"
            src={avatar}
            alt="avatar"
          ></Avatar>
          <form className=" w-full" onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className=" w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`Whats on your Mind ${
                    user?.displayName.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  className=" outline-none w-full bg-white rounded-md"
                  ref={text}
                />
              </div>
              <div className=" mx-4">
                {image && (
                  <img
                    alt="preview"
                    src={image}
                    className=" h-24 rounded-xl"
                  ></img>
                )}
              </div>
              <div className=" mr-4">
                <Button variant="text" type="submit" className=" bg-gray-400">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className=" bg-blue-700 py-1 rounded-md"
        >
          {}
        </span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className=" cursor-pointer flex items-center"
            >
              <img className=" h-10 mr-4" src={addImage} alt="addImage" />
              <input
                type="file"
                id="addImage"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                Upload
              </Button>
            )}
          </div>
          <div className=" flex items-center">
            <img className=" h-10 mr-4" src={live} alt="live" />
            <p className="font-serif font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>
          <div className=" flex items-center">
            <img className=" h-10 mr-4" src={smile} alt="smile" />
            <p className="font-serif font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Smile
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">{/* posts */}</div>
      <div ref={scrollRef}>{/* Refrence for later */}</div>
    </div>
  );
};

export default Main;
