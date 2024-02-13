import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require('crypto-js');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email } = req.body;
            let user = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'Dream123').toString() });
            await user.save();
            res.status(200).json({ success: "success" });

        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);