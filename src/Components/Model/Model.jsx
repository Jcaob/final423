import React, { useState, useContext } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../AppContext/AppContext";

function AddAlbumModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, userData, updateCurrentUser } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!modalVisible);

    console.log(user);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the `formData` object
    console.log(formData);
    updateCurrentUser(formData.name);
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
              Profile
            </Typography>

            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col justify-center  items-center"
              onSubmit={handleSubmit}
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
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder={user?.email}
                  name="email"
                  id="userEmail"
                  value={formData.email}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={handleChange}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type="password"
                  id="userPassword"
                  name="message"
                  value={formData.message}
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={handleChange}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button className="mt-6 w-15 " fullWidth type="submit">
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
