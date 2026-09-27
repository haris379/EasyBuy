import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// const sendEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"EasyBuy Team" <infoeasybuystore0@gmail.com>', // sender address
//       to: "sheikharis574@gmail.com", // list of recipients
//       subject: "Verify Your email", // subject line
//       text: "Email Recieved Successfully", // plain text body
//       html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Email Send Successfully");
//   } catch (error) {
//     console.log("Error in Sending email", error);
//   }
// };

// sendEmail();
