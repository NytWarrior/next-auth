import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let user = await User.findOne({ 'email': req.body.email });
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (user.email === req.body.email && req.body.password === decryptPass) {
                    var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '20d' })
                    res.status(200).json({ success: true, token, email: user.email });
                } else {
                    res.status(401).json({ success: false, error: 'Invalid email or password' });
                }
            } else {
                res.status(404).json({ success: false, error: 'User not found' });
            }

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);
