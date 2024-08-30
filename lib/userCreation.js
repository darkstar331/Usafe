// /lib/userCreation.js
import User from '@/models/user';
import dbConnect from './db';

export async function triggerUserCreation(user) {
  // Wrap in an asynchronous IIFE to handle the user creation asynchronously
  (async () => {
    try {
      // Connect to MongoDB
      await dbConnect();

      // Check if the user already exists
      const existingUser = await User.findOne({ email: user.email });

      // If the user doesn't exist, create a new user
      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          name: user.name,
        });

        await newUser.save();
        console.log('User created successfully:', newUser);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  })();
}
