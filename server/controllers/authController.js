import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import Auth from '../middleware/Auth.js'
import {
    Registration_Template,
    Password_Reset_Template,
    Email_Verification_Template,
    Password_Changed_Template
} from '../config/emailTemplates.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide complete information", success: false });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userInfo = new User({ name, email, password: hashPassword });
        await userInfo.save();

        const token = jwt.sign(
            { id: userInfo._id, email: userInfo.email },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '2d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // ✅ Sending Welcome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: '🎉 Welcome to Shivani.codes Auth Platform!',
            text: `Hey ${name} 👋

                Welcome to the Auth platform by Shivani.codes!
                We're thrilled to have you onboard.

                ✅ Your account has been successfully created.  
                📧 Registered Email: ${email}

                You can now log in and start using all the features securely and seamlessly.

                If you ever have any questions or need help, we’re just an email away!

                Let’s build something amazing together 🚀

                Cheers,  
                Team Shivani.codes 💙
                            `
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "please provide complete information", success: false })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found!", success: false })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: " invalid Password!", success: false })
        }
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '2d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //sending welcome email

        const htmlContent = Registration_Template
            .replaceAll('{name}', existingUser.name)
            .replaceAll('{email}', existingUser.email);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: '🚀 Welcome to Auth by Shivani.codes You are Officially In!',
            html: htmlContent
        }
        // await transporter.sendMail(mailOptions)
        return res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: 'Logged Out' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//send verification otp to user email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (existUser.isAccountVerified) {
            return res.json({ success: false, message: 'account already verified!' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        existUser.verifyOtp = otp;
        existUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await existUser.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: existUser.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        }

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Verification OTP Sent on Eamil' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


//verify using otp
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' })
    }
    try {
        const existUser = await User.findById(userId);
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        if (existUser.verifyOtp === '' || existUser.verifyOtp !== otp) {
            console.log("existUser.verifyOtp", existUser.verifyOtp);
            console.log({ otp })
            return res.json({ success: false, message: 'Invalid OTP!', actualotp: existUser.verifyOtp, yourOTP: otp })
        }

        if (existUser.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired!' })
        }

        existUser.isAccountVerified = true;
        existUser.verifyOtp = '';
        existUser.verifyOtpExpireAt = 0;
        await existUser.save();
        return res.json({ success: true, message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

//send password reset OTP 
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Email Missing ' })
    }
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        existUser.resetOtp = otp;
        existUser.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await existUser.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: existUser.email,
            subject: 'Password Reset OTP',
            text: `Your OTP to reset password is: ${otp}. It expires in 15 minutes.`


        }

        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: 'Reset OTP send to your email' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
};

//reest user password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: ' Missing Details' })
    }
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.json({ success: false, message: 'user not found!' })
        }

        if (existUser.resetOtp === '' || existUser.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' })
        }
        if (existUser.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        existUser.password = hashedPassword;
        existUser.resetOtp = '',
            existUser.resetOtpExpireAt = 0;
        await existUser.save();
        return res.json({ success: true, message: 'Password has been reset successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}