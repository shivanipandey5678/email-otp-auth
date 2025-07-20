
export const Registration_Template=`
   <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Welcome to Shivani.codes 🚀</h2>
      <p>Hi {{name}},</p>
      <p>Thank you for registering on our platform. We're excited to have you on board!</p>
      <p>Your email <strong>{{email}}</strong> has been successfully registered.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <br />
      <p style="color: #6b7280;">Cheers, <br/>Team Shivani.codes 💙</p>
    </div>
  </body>
</html>


`

export const Password_Reset_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Reset Your Password 🔐</h2>
      <p>Hi {{name}},</p>
      <p>We received a request to reset your password for the account associated with <strong>{{email}}</strong>.</p>
      <p>Please use the following OTP to reset your password:</p>
      <h1 style="letter-spacing: 6px; text-align: center; color: #111827;">{{otp}}</h1>
      <p>This OTP will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.</p>
      <br/>
      <p style="color: #6b7280;">Cheers, <br/>Team Shivani.codes 💙</p>
    </div>
  </body>
</html>
`;

export const Email_Verification_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Verify Your Email Address ✉️</h2>
      <p>Hi {{name}},</p>
      <p>Thank you for registering with Shivani.codes!</p>
      <p>Please verify your email by entering the following OTP:</p>
      <h1 style="letter-spacing: 6px; text-align: center; color: #111827;">{{otp}}</h1>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      <br/>
      <p style="color: #6b7280;">Cheers, <br/>Team Shivani.codes 💙</p>
    </div>
  </body>
</html>
`;

export const Password_Changed_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Password Changed Successfully 🔐</h2>
      <p>Hi {{name}},</p>
      <p>Your password has been changed successfully. If this wasn’t you, please contact support immediately.</p>
      <br/>
      <p style="color: #6b7280;">Cheers, <br/>Team Shivani.codes 💙</p>
    </div>
  </body>
</html>
`;
