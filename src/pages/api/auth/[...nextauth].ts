import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
  additionalData?: any; // Add a field for additional data
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_ID || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET_ID || "",
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("Redirect callback:", { url, baseUrl });
      return baseUrl + '/';
    },

    async signIn({ user, account, profile, email, credentials }: { user: any; account: any; profile?: any; email?: { verificationRequest?: boolean } | undefined; credentials?: any }) {
      console.log("SignIn callback:", { user, account, profile, email, credentials });
      try {
        // Additional logic (if needed)
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT, user?: any }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;

        // Fetch additional user data
        try {
          const userDataResponse = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            }),
          });

          if (userDataResponse.ok) {
            const additionalData = await userDataResponse.json();
            token.additionalData = additionalData; // Store additional data in the token
          }
        } catch (error) {
          console.error('Error fetching additional user data:', error);
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any; }) {
      // Pass additional data to the session
      session.user = {
        ...session.user,
        additionalData: token.additionalData,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
