import { Verification_Email_Template } from "../template/codeTemplate.js";
import { Welcome_Email_Template } from "../template/welcomeTemplate.js";
import { transporter } from "./emailConfig.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: '"EasyBuy Team" <infoeasybuystore0@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Verify Your email", // subject line
      text: "Verify Your email", // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode,
      ), // HTML body
    });

    console.log("Verification Code Send Successfully");
  } catch (error) {
    console.log("Error in Sending Verification Code", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: '"EasyBuy Team" <infoeasybuystore0@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Verify Your email", // subject line
      text: "Verify Your email", // plain text body
      html: Welcome_Email_Template.replace("{name}", name), // HTML body
    });

    console.log("Verification Code Send Successfully");
  } catch (error) {
    console.log("Error in Sending Verification Code", error);
  }
};
