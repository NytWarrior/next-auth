import Forgot from "@/models/Forgot";
import User from "@/models/User";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';


export default async function handler(req, res) {

    if (req.body.sendEmail) {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        let token = uuidv4();

        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })
        await forgot.save();
        let emailHtml = `<table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">

                <tr>

                    <td align="center" valign="top">

                        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">

                            <!-- Title -->

                            <tr>

                                <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">

                                    <span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span>

                                </td>

                            </tr>

                            <!-- Messages -->

                            <tr>

                                <td align="left" valign="top" colspan="2" style="padding-top: 10px;">

                                    <span style="font-size: 12px; line-height: 1.5; color: #333333;">

                                        We have sent you this email in response to your request to reset your password on NextAuth.

                                        <br/><br/>

                                        To reset your password, please follow the link below:

                                        <a href="http://localhost:3000/forgot?token=${token}">Click here to reset ypor password</a>

                                        <br/><br/>

                                        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your NextAuth - My Account Page and change your password.

                                        <br/><br/>

                                    </span>

                                </td>

                            </tr>

                        </table>

                    </td>

                </tr>

            </table>`

        const mailOptions = {
            from: process.env.GMAIL,
            to: req.body.email,
            subject: "Reset NextAuth password",
            html: emailHtml,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent successfully');
            }
        });

    }
    else {

        let token = req.body.token;
        let data = await Forgot.findOne({ token: token });

        if (token === data.token) {
            let dbuser = await User.findOneAndUpdate({ email: data.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString() });
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ success: false })
        }
    }
}