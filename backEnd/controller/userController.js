import User from "../Model/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import sendMail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import upload from "../middleware/Multer.js";
import mongoose from "mongoose";

//--------- User Registraton  Controller -----------//

export const register = async (req, res) => {
  try {
    // Destructuring
    const { name, password, email } = req.body;

    // Validating input
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide name, password, and email" });
    }

    // Checking if user already exists
    const existUser = await User.findOne({
      $and: [
        { email: email }, // Check if the email matches
        { is_verfied: false }, // Check if the user is not verified
      ],
    });
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please Login" });
    }

    // Hashing the password only when user exists
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating new User
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    // Generating otp using loop and random 4 digit otp
    let otp = "";
    const digits = "0123456789";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    // Save the user to the database
    const userRegistered = await user
      .save()
      .then(console.log("user registered"));

    // store otp in userData
    await User.findOneAndUpdate({ email: email, $set: { otp: otp } });

    // sending mail with otp
    await sendMail(email, otp);

    // if any error in registration
    if (!userRegistered) {
      res
        .status(500)
        .json({ message: "Something went wrong Please Try Again" });
    }

    // New User created Successfully
    res
      .status(201)
      .json({ created: true, message: "Please confirm otp send your mail" });
  } catch (error) {
    console.log(error.message);
  }
};

//--------- User Otp verification  Controller -----------//

export const otpVerification = async (req, res) => {
  try {
    // destructuring to variable
    const { email, otp } = req.body;

    // is any one is not there we return
    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide  otp and email" });
    }

    //finding user from database with these condition
    const user = await User.findOne({ email: email.id, otp });

    if (user) {
      // user found , otp verified and updating database as verified
      const verified = await User.findOneAndUpdate({
        email: email.id,
        $set: { is_verfied: true },
      });

      // send a message to front end with success status code
      if (verified)
        return res
          .status(200)
          .json({ verified: true, message: "OTP verified successfully" });
    } else {
      // If user is not found with the given email and OTP
      return res
        .status(404)
        .json({ success: true, message: "Invalid OTP or email" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//--------- Resend Otp  Controller -----------//

export const resendOtp = async (req, res) => {
  try {
    const email = req.body;

    // Generating otp using loop and random 4 digit otp
    let otp = "";
    const digits = "0123456789";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    // store otp in userData
    const user = await User.findOneAndUpdate({
      email: email.id,
      $set: { otp: otp },
    });

    // not user found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // sending mail with otp
    const mailSended = await sendMail(email.id, otp);

    if (!mailSended) {
      return res.status(500).json({ message: "Failed to send OTP via email" });
    } else {
      // successfuly send otp
      return res
        .status(200)
        .json({ sended: true, message: "Please check your email for new OTP" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error Something went wrong" });
  }
};

//--------- User Login  Controller -----------//

export const userLogin = async (req, res) => {
  try {
    // destructuring
    const { email, password } = req.body;

    // in case there is no email or password
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "please check your email and password" });

    //finding user in database
    const existUser = await User.findOne({ email });

    // no user found case

    if (!existUser) return res.status(404).json({ message: "User not found" });

    // if user not verified with otp
    if (!existUser.is_verfied)
      return res.status(200).json({ message: "Please verify your account" });

    // comparing user password
    const passwordMatch = await bcrypt.compare(password, existUser.password);

    // incorrect password
    if (!passwordMatch) {
      return res.status(401).json({ message: "incorrect password" });
    }

    // login success
    const userData = existUser;
    const usertoken = jwt.sign(
      { userId: existUser._id },
      process.env.JWT_USER_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      status: true,
      usertoken,
      userData,
      message: "your login is completed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// fetching profile Details from database

export const profileDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const profileData = await User.findOne({ _id: id }).select("-password");

    if (!profileData) {
      return res.status(400).json({ message: "no profile" });
    }
    return res.status(200).json(profileData);
  } catch (error) {
    console.log(error.message);
  }
};

// profile adding section
export const upDateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, place, date } = req.body;
    let updateData = {
      name: name,
      place: place,
      date: date,
    };

    // Only include the image field in the update if it is not empty
    if (req.file && req.file.path) {
      // Assuming path is where your image is stored
      updateData.image = req.file.path;
    }

    // updating user data
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
      // Return the updated document
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ updated: true, data: updatedUser, message: "Profile Updated" });
    } else {
      return res.status(400).json({ message: "updation failed" });
    }
  } catch (error) {
    console.log(error);
  }
};
