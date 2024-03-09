import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

import Img from "../../assets/userAssets/download (3).jpg";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { LoginSchema } from "../../yupValidation/Validation";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";

import toast, { Toaster } from "react-hot-toast";
import { UserLogin } from "../../api/UserApi";



export default function Login() {
  const dispatch = useDispatch();
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
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await UserLogin(values);

        const userDetails = {
          id: response.data.userData?._id,
          name: response.data.userData?.name,
          email: response.data.userData?.email,
        };
        dispatch(
          setUserDetails({
            userInfo: userDetails,
          })

        );
        console.log(response.data.usertoken)
        localStorage.setItem("userToken", response.data.usertoken);
        toast.success(response.data.message)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        console.log(error)
      }

    },
  });
  return (
    <>
      <div><Toaster /></div>
      <div className="flex justify-center items-center h-screen   bg-[#F6E2D3]">
        <Card className="w-full max-w-[48rem]  flex-row">
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
              Sign in
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to Login
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
            >
              <div className="mb-4 flex flex-col gap-3">
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


              <Button type="submit" className="mt-6" fullWidth>
                Sign in
              </Button>
            </form>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <div className="pb-5">
                <h1>
                  Do you have an account?
                  <button
                    onClick={() => navigate("/register")}
                    className="text-cyan-600"
                  >
                    Signup
                  </button>
                </h1>
              </div>
            </Typography>
          </CardBody>
        </Card>
      </div>

    </>
  );
}
