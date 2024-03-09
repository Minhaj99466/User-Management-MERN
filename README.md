
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express




# User Management Application(MERN)

## A brief description of what this project does and who it's for

Welcome to the User Management Application, a comprehensive platform where users can register, authenticate, and manage their accounts. The application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, providing a robust and scalable solution for user management.

📦 Tech Stack:

- MongoDB: NoSQL database for storing user information securely.
- Express.js: Web application framework for building backend APIs and handling HTTP requests.
- React.js: Frontend library for building interactive user - interfaces.
- Node.js: JavaScript runtime environment for server-side development.

## Features

👩🏽‍🍳 Features:

- User Registration: Users can sign up for individual accounts,
 providing necessary profile information.
- Authentication Options: Supports traditional email-password
- Profile Management: Allows users to edit their profiles, update 
-Password Encryption: Implements secure password hashing techniques(#bcrypt) for protecting user credentials.
- Otp Verification: Sends verification emails to confirm user accounts and ensure security using Node Mailer.


## Lessons Learned


📚 Learnings:

- MongoDB Integration: Implements MongoDB for storing user data and leveraging its flexibility in handling complex data structures.
- React Components: Utilizes reusable React components for building a modular and maintainable frontend architecture.
- Express Middleware: Implements middleware for authentication, error handling, and request processing.
- JWT Authentication: Integrates JSON Web Tokens (JWT) for secure authentication and authorization proces
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT: The port on which the server will run.`

`MONGODB: The MongoDB connection URL. || your_mongodb_connection_url`

`JWT_USER_KEY: Secret key for JWT token generation. || your_secret_key`

`BASE_URL: Base URL of the application. || http://localhost:3000`

`HOST: SMTP server host for email services. || smtp.your_email_provider.com`

`SERVICE: Service provider for email services. || your_email_service_provider`

`PORT: Port for email services. || 587`

`USER: Email address for sending emails. || your_email@example.com`

`PASS: Password for the email account. || your_email_password`

`CLIENTADDRESS: Client address for the frontend application. || http://localhost:3002`

`CLIENT_URL: URL of the frontend application. || http://localhost:3002`

Please create a .env file in the root directory of the backend project and define these variables. You can use the following format:


## Run Locally/Run Project in Your System Server Side

Clone and Install:Client Side

```bash
  git clone https://github.com/Minhaj99466/User-Management-MERN.git
```

Go to the project directory

```bash
  cd backEnd
```

Install dependencies

```bash
  npm install
```

Set Up MongoDB
configure mongoDb compass connection setting  in the application to ensure proper database interaction.

Run Development Server:

 ``` bash
 nodmeon
```
Access the Application
Navigate to:
```
http://localhost:3000/
```



## Run Locally/Run Project in Your Client Side

Go to the project directory

```bash
  cd frontEnd
```

Install dependencies

```bash
  npm install
```



Run Development Server:

 ``` bash
 npm run dev




```
Access the Application
Navigate to:
```
http://localhost:5173/
```
For API Documentaion Please check BackEnd Swagger File
