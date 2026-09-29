export const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your EasyBuy Account</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
">

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
">

  <!-- Email Preview Text -->
  <div style="
    display: none;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    color: transparent;
    visibility: hidden;
    font-size: 1px;
    line-height: 1px;
  ">
    Your EasyBuy verification code is ready. Verify your email address to complete your account setup.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 40px 15px;">

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
                padding: 28px 20px;
              "
            >
              <div style="
                font-size: 28px;
                font-weight: bold;
                color: #ffffff;
                letter-spacing: 0.5px;
              ">
                EasyBuy
              </div>

              <div style="
                margin-top: 6px;
                font-size: 14px;
                color: #dbeafe;
              ">
                Shop Easy. Buy Easy.
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px 25px;">

              <h1 style="
                margin: 0 0 15px;
                font-size: 24px;
                color: #111827;
                text-align: center;
              ">
                Verify Your Email
              </h1>

              <p style="
                margin: 0 0 18px;
                font-size: 15px;
                line-height: 1.7;
                color: #4b5563;
              ">
                Hello,
              </p>

              <p style="
                margin: 0 0 20px;
                font-size: 15px;
                line-height: 1.7;
                color: #4b5563;
              ">
                Thank you for creating an account with <strong>EasyBuy</strong>.
                Please use the verification code below to confirm your email address.
              </p>

              <!-- Verification Code -->
              <div style="
                margin: 25px 0;
                padding: 18px;
                text-align: center;
                background-color: #eff6ff;
                border: 1px dashed #2563eb;
                border-radius: 8px;
              ">
                <div style="
                  font-size: 12px;
                  color: #6b7280;
                  margin-bottom: 8px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                ">
                  Verification Code
                </div>

                <div style="
                  font-size: 32px;
                  font-weight: bold;
                  letter-spacing: 7px;
                  color: #2563eb;
                ">
                  {verificationCode}
                </div>
              </div>

              <!-- Expiry Notice -->
              <div style="
                margin: 20px 0;
                padding: 12px 15px;
                background-color: #fff7ed;
                border-radius: 6px;
                text-align: center;
              ">
                <p style="
                  margin: 0;
                  font-size: 13px;
                  color: #9a3412;
                ">
                  ⏱ This verification code will expire in <strong>10 minutes</strong>.
                </p>
              </div>

              <p style="
                margin: 20px 0 10px;
                font-size: 14px;
                line-height: 1.7;
                color: #6b7280;
              ">
                If you did not create an EasyBuy account, you can safely ignore this
                email. Your account will not be verified without this code.
              </p>

              <p style="
                margin: 20px 0 0;
                font-size: 14px;
                color: #4b5563;
              ">
                Thanks,<br />
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
                Need help? Contact EasyBuy Support.
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
