import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (!sessionUser) {
          throw new Error('User not found');
        }
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        throw new Error('Failed to retrieve user session');
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error('Sign-in callback error:', error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };