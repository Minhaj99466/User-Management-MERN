import nodemailer from "nodemailer";
const sendMail = async (email,otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
    port: process.env.PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      requireTLS: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter
      .sendMail({
        from: process.env.USER,
        to: email, // list of receivers
        subject: "Verify Your Login Using OtP", // Subject line
        text: `Hello world? Here is your Otp`, // plain text body
        html: ` <b><h4>Hi✋ ${email} Here is Your OTP to Login UserManagement App<h4/> 😊 <h1>${otp}<h1/> </b>`, // html body
      })
      .then(()=>console.log("message send successfully"));
      return true; 
  } catch (error) {
    console.log("Message sent: %s");
  }
};

export default sendMail;
