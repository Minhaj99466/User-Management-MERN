import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import Img from "../../assets/userAssets/userLogin2.jpg";
import { useNavigate } from "react-router-dom";
import SignupSchema from "../../yupValidation/Validation";

import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { UserSignUp } from "../../api/UserApi";




export default function Signup() {
  const navigate = useNavigate();



  const initialValues = {
    name: "",
    password: "",
    email: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      let email = values.email
      const response = await UserSignUp(values);
      if (response.data.created) {
        toast.success(response.data.message)
        setTimeout(() => {
          navigate(`/otp/${email}`)
        }, 2000)
      } else {
        alert(response.message)
      }
    },
  });

  return (
    <>

      <div><Toaster /></div>
      <div className="flex justify-center items-center h-screen bg-[#F6E2D3]">
        <Card className="w-full max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none hidden sm:block"
          >
            <img
              src={Img}
              alt="card-image"
              className="h-full w-full object-cover "
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-3">
                <Input
                  variant="static"
                  size="lg"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Name"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
                <Input
                  variant="static"
                  size="lg"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs ">{errors.email}</div>
                )}
                <Input
                  variant="static"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  size="lg"
                  label="Password"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-xs ">{errors.password}</div>
                )}
              </div>
              {/* {msg && <div className="text-green-500 text-xs ">{msg}</div>} */}
              <Button type="submit" className="mt-6" fullWidth>
                Register
              </Button>
            </form>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <div className="pb-5">
                <h1>
                  Do you have an account?
                  <button
                    onClick={() => navigate("/login")}
                    className="text-cyan-600"
                  >
                    Sign in
                  </button>
                </h1>
              </div>
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* <ToastContainer /> */}
    </>
  );
}
