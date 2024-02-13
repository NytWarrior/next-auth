import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    try {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        return handler(req, res);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default connectDb;
