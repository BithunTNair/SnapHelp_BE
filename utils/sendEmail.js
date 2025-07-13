const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.PASSWORD

    }
});
const sendOtp = async (mail, otp) => {
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: mail,
        subject: "Your SnapHelp OTP Verification Code",
        text: `Hello,

Thank you for signing up with SnapHelp – your trusted hyperlocal service marketplace.

Your One-Time Password (OTP) for verification is: ${otp}

Please enter this code in the app to complete your registration. 
This OTP is valid for 10 minutes and should not be shared with anyone for your security.

If you did not request this, please ignore this email.

Best regards,
The SnapHelp Team`
    };
    try {
        await transport.sendMail(mailOptions);
        console.log('OTP has been sent successfully');
    } catch (error) {
        console.log(error);

    }
};

module.exports = { sendOtp }