const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    // Add these options to help with debugging and security
    tls: {
        rejectUnauthorized: false
    },
    debug: process.env.NODE_ENV !== 'production'
});

function sendEmail(email, otp) {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Welcome To Todo Application",
        text: `Your OTP is ${otp}. Please verify it to complete your authentication.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <h2 style="color: #4CAF50; text-align: center;">Taskify Authentication</h2>
                <p>Hello,</p>
                <p>Your one-time password (OTP) for Taskify authentication is:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; padding: 10px 20px; background-color: #f5f5f5; border-radius: 5px;">${otp}</span>
                </div>
                <p>This OTP is valid for 15 minutes. If you did not request this OTP, please ignore this email.</p>
                <p>Thank you,<br>Taskify Team</p>
            </div>
        `
    }

    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;