import mongoose from 'mongoose';

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb+srv://Harman:Edmonton%40123@safeu.uwbam.mongodb.net/safeu?retryWrites=true&w=majority&appName=SafeU';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
