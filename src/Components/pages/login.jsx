import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const { signInWithGoogle, loginWithUserAndEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  let initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("6", "Must be atleast 6 characters")
      .matches(/^[a-zA-Z]+$/, "Password can only contain Letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithUserAndEmail(email, password);
      setLoading(true);
    } else {
      setLoading(false);
    }
    console.log("Formik", formik);
  };

  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (
    <>
      {" "}
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fdd" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className=" grid grid-cols-1 h-screen justify-center items-center justify-items-center">
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                LOGIN
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <div className=" mb-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="lg"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className=" mt-4 mb-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="small" color="red">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <Button
                  variant="gradient"
                  fullWidth
                  className="mb-4 "
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                fullWidth
                className="mb-4"
                onClick={signInWithGoogle}
              >
                Sign In with Google
              </Button>
              <Link to="/reset">
                <p className="ml-1 font-bold font-serif text-sm flex justify-center text-blue-500 text-center">
                  Reset Your Password
                </p>
              </Link>
              <div className=" mt-6 flex font-serif text-base justify-center items-center">
                Don't Have An Account?
                <Link to="/register">
                  <p className="ml-1 font-bold font-serif text-sm flex justify-center text-blue-500 text-center">
                    Register
                  </p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;
