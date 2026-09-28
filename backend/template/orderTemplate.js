export const Order_Confirmation_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation - EasyBuy</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 560px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background-color: #2563eb;
                padding: 30px 20px;
              "
            >
              <div style="
                font-size: 30px;
                font-weight: bold;
                color: #ffffff;
                letter-spacing: 0.5px;
              ">
                EasyBuy
              </div>

              <div style="
                margin-top: 7px;
                font-size: 14px;
                color: #dbeafe;
              ">
                Shop Easy. Buy Easy.
              </div>
            </td>
          </tr>

          <!-- Order Confirmation Content -->
          <tr>
            <td style="padding: 35px 30px 30px;">

              <h1 style="
                margin: 0 0 18px;
                text-align: center;
                font-size: 25px;
                color: #111827;
              ">
                Order Confirmed! 🎉
              </h1>

              <p style="
                margin: 0 0 18px;
                font-size: 16px;
                line-height: 1.7;
                color: #374151;
              ">
                Hello <strong>{name}!</strong>,
              </p>

              <p style="
                margin: 0 0 20px;
                font-size: 15px;
                line-height: 1.8;
                color: #4b5563;
              ">
                Thank you for shopping with <strong>EasyBuy</strong>.
                Your order has been successfully placed and is now being processed.
              </p>

              <!-- Order ID -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #eff6ff;
                  border-radius: 8px;
                  margin: 20px 0 25px;
                "
              >
                <tr>
                  <td style="padding: 18px 20px;">

                    <p style="
                      margin: 0 0 6px;
                      font-size: 13px;
                      color: #6b7280;
                    ">
                      Order ID
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 17px;
                      font-weight: bold;
                      color: #1d4ed8;
                    ">
                      #{orderId}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <h2 style="
                margin: 0 0 15px;
                font-size: 18px;
                color: #111827;
              ">
                Order Details
              </h2>

              {orderItems}
              

              <!-- Total -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin-top: 20px;
                  border-top: 1px solid #e5e7eb;
                "
              >
                <tr>
                  <td style="
                    padding: 15px 0 5px;
                    font-size: 14px;
                    color: #6b7280;
                  ">
                    Subtotal
                  </td>

                  <td align="right" style="
                    padding: 15px 0 5px;
                    font-size: 14px;
                    color: #374151;
                  ">
                    Rs. {subtotal}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 5px 0;
                    font-size: 14px;
                    color: #6b7280;
                  ">
                    Delivery
                  </td>

                  <td align="right" style="
                    padding: 5px 0;
                    font-size: 14px;
                    color: #374151;
                  ">
                    Rs. {deliveryFee}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 12px 0;
                    font-size: 17px;
                    font-weight: bold;
                    color: #111827;
                  ">
                    Total
                  </td>

                  <td align="right" style="
                    padding: 12px 0;
                    font-size: 17px;
                    font-weight: bold;
                    color: #2563eb;
                  ">
                    Rs. {total}
                  </td>
                </tr>
              </table>

              <!-- Payment Information -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f9fafb;
                  border-radius: 8px;
                  margin: 20px 0;
                "
              >
                <tr>
                  <td style="padding: 18px 20px;">

                    <p style="
                      margin: 0 0 8px;
                      font-size: 14px;
                      font-weight: bold;
                      color: #374151;
                    ">
                      Payment Information
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 14px;
                      color: #6b7280;
                    ">
                      Method: <strong>{paymentMethod}</strong>
                    </p>

                    <p style="
                      margin: 6px 0 0;
                      font-size: 14px;
                      color: #6b7280;
                    ">
                      Payment Status: <strong>{paymentStatus}</strong>
                    </p>

                  </td>
                </tr>
              </table>

             
              <!-- CTA -->
              <div style="text-align: center; margin: 30px 0;">
                <a
                  href="https://e-commer-app-frontend.vercel.app/"
                  style="
                    display: inline-block;
                    background-color: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 13px 30px;
                    border-radius: 7px;
                    font-size: 15px;
                    font-weight: bold;
                  "
                >
                 Continue Shopping
                </a>
              </div>

              <p style="
                margin: 25px 0 0;
                font-size: 14px;
                line-height: 1.7;
                color: #6b7280;
                text-align: center;
              ">
                We will keep you updated about your order status.
                If you have any questions, please contact our support team.
              </p>

              <p style="
                margin: 22px 0 0;
                font-size: 14px;
                color: #4b5563;
              ">
                Thank you for shopping with us!<br />
                <strong>EasyBuy Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background-color: #f9fafb;
                padding: 20px;
                border-top: 1px solid #e5e7eb;
              "
            >

              <p style="
                margin: 0 0 8px;
                font-size: 13px;
                color: #6b7280;
              ">
                Thank you for choosing EasyBuy.
              </p>

              <p style="
                margin: 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                &copy; ${new Date().getFullYear()} EasyBuy. All rights reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
