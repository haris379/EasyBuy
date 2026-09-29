export const Welcome_Email_Template = ` <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Welcome to EasyBuy</title> </head> <body style=" margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, Helvetica, sans-serif; color: #1f2937; "> <!-- Hidden Preheader --> <div style=" display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent; font-size: 1px; line-height: 1px; "> Welcome to EasyBuy! Your account has been successfully verified. </div>
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

          <!-- Welcome Content -->
          <tr>
            <td style="padding: 35px 30px 30px;">

              <h1 style="
                margin: 0 0 18px;
                text-align: center;
                font-size: 25px;
                color: #111827;
              ">
                Welcome to EasyBuy! 🎉
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
                Welcome to <strong>EasyBuy</strong>! Your account has been
                successfully verified, and we're excited to have you with us.
              </p>

              <p style="
                margin: 0 0 22px;
                font-size: 15px;
                line-height: 1.8;
                color: #4b5563;
              ">
                You can now explore our products, discover great deals, and
                enjoy a simple and convenient shopping experience.
              </p>

              <!-- Benefits -->
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
                  <td style="padding: 20px;">

                    <p style="
                      margin: 0 0 12px;
                      font-size: 15px;
                      font-weight: bold;
                      color: #1d4ed8;
                    ">
                      What you can do on EasyBuy
                    </p>

                    <p style="
                      margin: 0 0 9px;
                      font-size: 14px;
                      line-height: 1.6;
                      color: #4b5563;
                    ">
                      ✓ Browse our latest products
                    </p>

                    <p style="
                      margin: 0 0 9px;
                      font-size: 14px;
                      line-height: 1.6;
                      color: #4b5563;
                    ">
                      ✓ Add your favorite items to your cart
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 14px;
                      line-height: 1.6;
                      color: #4b5563;
                    ">
                      ✓ Enjoy a simple and secure checkout
                    </p>

                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align: center; margin: 28px 0;">
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
                  Start Shopping
                </a>
              </div>

              <p style="
                margin: 25px 0 0;
                font-size: 14px;
                line-height: 1.7;
                color: #6b7280;
                text-align: center;
              ">
                If you have any questions or need help, our support team
                is always happy to assist you.
              </p>

              <p style="
                margin: 22px 0 0;
                font-size: 14px;
                color: #4b5563;
              ">
                Happy shopping!<br />
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
