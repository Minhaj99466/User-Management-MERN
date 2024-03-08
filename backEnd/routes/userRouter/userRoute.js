import express from "express";
import {
  otpVerification,
  profileDetails,
  register,
  resendOtp,
  upDateProfile,
  userLogin,
} from "../../controller/userController.js";
import upload from "../../middleware/Multer.js";

const userRoute = express();

// POST Route for User Registration
// userRoute.post('/',register)
userRoute.post("/signup", register);
userRoute.post("/otp", otpVerification);
userRoute.post("/resendOtp", resendOtp);
userRoute.post("/login", userLogin);
userRoute.get("/profile/:id", profileDetails);
userRoute.put("/addProfile/:id", upload.single('image'), upDateProfile);

export default userRoute;
