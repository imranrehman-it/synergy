import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
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
      const authenticatedUser = user as AuthenticatedUser;
      const userId = authenticatedUser.id;
      try {
        console.log('Adding user:', authenticatedUser);
        console.log('User added successfully');
        return true;
      } catch (error) {
        console.error('Error signing in user:', error);
        return false;
      }
    },
}
}
export default NextAuth(authOptions)