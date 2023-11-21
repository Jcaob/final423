import React, { useState, useContext } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../AppContext/AppContext";
// import $ from "jquery";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/firebase";
function AddAlbumModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, userData, updateCurrentUser } = useContext(AuthContext);
  const [userImage, setUserImage] = useState("");
  const storage = getStorage(app);
  let imageURL = "";

  const toggleModal = () => {
    setModalVisible(!modalVisible);

    console.log(user);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Image: "",
  });

  const upload = async (e) => {
    const storage = getStorage(app);

    const fileInput = document.getElementById("myImage");
    if (fileInput) {
      const file = fileInput.files[0];
      // Rest of your upload code
      const fileName = +new Date() + "-" + file.name;
      const metadata = { contentType: file.type };

      const pathRef = ref(storage, "images/" + fileName);
      const storageRef = ref(storage, pathRef);

      const uploadTask = uploadBytesResumable(storageRef, file);

      e.preventDefault();
      // updateCurrentUser(formData.Image);

      uploadTask.on(
        "state_changed",

        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },

        (error) => {
          // Handle unsuccessful uploads
          console.log("error", error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File Done Here da URL", downloadURL);
            imageURL = downloadURL;
            console.log(imageURL);
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, Image } = e.target;
    console.log(formData);
    setFormData({
      ...formData,
      [name]: value,
      [Image]: setUserImage(imageURL),
    });
  };

  const handleSubmit = (e) => {
    // You can access the form data in the `formData` object

    console.log(imageURL);
    updateCurrentUser(formData.name, imageURL);
    // Here, you can send the data to a server or perform any other desired action.
  };

  return (
    <div className="flex flex-col justify-center  items-center">
      <button id="home" onClick={toggleModal}>
        Edit Profile
      </button>

      {modalVisible && (
        <div id="modal">
          <div
            className="close flex flex-col justify-center  items-center"
            onClick={toggleModal}
          >
            Close
          </div>
          {/* Modal content goes here */}
          <Card
            color="transparent"
            shadow={false}
            className=" flex flex-col justify-center  items-center"
          >
            <Typography variant="h4" color="blue-gray">
              Update Your Name
            </Typography>

            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col justify-center  items-center"
              // onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  placeholder={user?.displayName}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  name="name"
                  value={formData.name}
                  id="displayName"
                  onChange={handleChange}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Profile Picture
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  name="Image"
                  id="myImage"
                  type="file"
                  value={formData.Image}
                  onChange={handleChange}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Button className=" w-full" onClick={upload}>
                  Upload
                </Button>

                <div id="imageHolder"></div>
              </div>
              <Button
                className="mt-6 w-15 "
                fullWidth
                type="submit"
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AddAlbumModal;
