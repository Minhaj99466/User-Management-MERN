import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  is_verfied: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
