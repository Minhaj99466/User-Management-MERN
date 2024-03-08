// import the necessary modules
import express from "express";
import userRoute from "./routes/userRouter/userRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import env from 'dotenv'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument  from'./swagger-output.json'assert { type: 'json' };






// Create an instance of the Express application
const app = express();

// environment variable 
env.config()


// swagger for api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// connecting mongo db use mongodb compass url
mongoose.connect()   

// Middleware for parsing JSON requests
app.use(express.json());


app.use('/files',express.static('public'))

// Middleware for parsing URL-encoded requests with extended mode enabled
app.use(express.urlencoded({ extended: true }));

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors(
  ({
      origin:[process.env.CLIENTADDRESS],
      methods:["GET","POST","PUT","PATCH"],
      credentials:true
  })
))

// Include userRoute for handling user-related routes
app.use("/", userRoute);

// Start the Express server and listen on port 
app.listen(process.env.port, () => {
  console.log("server is running");
});
