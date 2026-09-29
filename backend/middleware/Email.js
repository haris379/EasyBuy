import { Verification_Email_Template } from "../template/codeTemplate.js";
import { Order_Confirmation_Email_Template } from "../template/orderTemplate.js";
import { Welcome_Email_Template } from "../template/welcomeTemplate.js";
import { transporter } from "./emailConfig.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: '"EasyBuy Team" <infoeasybuystore0@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Verify Your EasyBuy Email", // subject line
      text: "Your EasyBuy verification code is required to verify your email address.", // plain text body
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
      subject: "Welcome to EasyBuy! 🎉", // subject line
      text: "Welcome to EasyBuy! Your account has been successfully verified.", // plain text body
      html: Welcome_Email_Template.replace("{name}", name), // HTML body
    });

    console.log("Verification Code Send Successfully");
  } catch (error) {
    console.log("Error in Sending Verification Code", error);
  }
};

export const sendOrderEmail = async (
  email,
  name,
  orderId,
  orderItems,
  subtotal,
  paymentMethod,
) => {
  try {
    const items = orderItems
      .map(
        (item) => `
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="border-bottom: 1px solid #e5e7eb;"
      >
        <tr>
          <td style="padding: 12px 0;">
            <strong style="font-size: 14px; color: #374151;">
              ${item.title}
            </strong>

            <div style="
              margin-top: 4px;
              font-size: 13px;
              color: #6b7280;
            ">
              Quantity: ${item.quantity}
            </div>
          </td>

          <td align="right" style="
            padding: 12px 0;
            font-size: 14px;
            font-weight: bold;
            color: #374151;
          ">
            Rs. ${item.price * item.quantity}
          </td>
        </tr>
      </table>
    `,
      )
      .join("");
    const deliveryAmount = 500;
    const total = subtotal + deliveryAmount;
    const paymentStatus = "Pending";

    await transporter.sendMail({
      from: '"EasyBuy Team" <infoeasybuystore0@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Order Confirmation - EasyBuy 🎉", // subject line
      text: `Your EasyBuy order has been confirmed. Thank you for shopping with us!`, // plain text body
      html: Order_Confirmation_Email_Template.replace("{name}", name)
        .replace("{orderId}", orderId)
        .replace("{orderItems}", items)
        .replace("{subtotal}", subtotal)
        .replace("{deliveryFee}", deliveryAmount)
        .replace("{total}", total)
        .replace("{paymentMethod}", paymentMethod)
        .replace("{paymentStatus}", paymentStatus),
    });

    console.log("Order confirm");
    console.log(orderItems);
  } catch (error) {
    console.log("Error in Sending Verification Code", error);
  }
};
