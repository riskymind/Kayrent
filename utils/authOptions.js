import connectDB from "@/config/database";
import User from "@/models/user.model";

import GoogleProvider from "next-auth/providers/google";

console.log("GoogleProvider:", GoogleProvider);

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },

    // Modifies the session object
    async session({ session, token }) {
      if (token) {
        // 1. Get user from database
        const user = await User.findOne({ email: token.email });
        // 2. Assign the user id to the session
        session.user = {
          email: token.email,
          image: token.picture,
          id: user._id.toString()
        };
      }

      // 3. return session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// if (token) {
//   session.user = {
//     email: token.email,
//     name: token.name,
//     image: token.picture,
//   };
// }
// return session;
