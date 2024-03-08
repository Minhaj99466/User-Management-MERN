// import jwt from "jsonwebtoken";
// import User from "../Model/userModel.js";

// export const userAuth = async (req, res, next) => {
//     try {
//       if (req.headers.authorization) {
//         let token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, "gghjgjhghjgjbnjhgjgjhbdghjgjgyudbbnsvds".JWTUSERKEY);
//         const user = await User.findOne({
//           _id: decoded.userId,
//         });
//             req.headers.userId = decoded.userId;
//         if (user) {
//           if (user.is_block === false) {
//             next();
//           } else {
//             return res.status(500).json({ message: "You are blocked by admin " });
//           }
//         } else {
//           return res
//             .status(500)
//             .json({ message: "user not authorised or inavid user" });
//         }
//       } else {
//         return res.status(500).json({ message: "user not authorised" });  
//       }
//     } catch (error) {
//       if(error.message=="jwt expired"){
//         return res.status(500).json({message:"Token Expired Please Login"})
//       }
//       console.log(error.message);
//     }
//   };
  