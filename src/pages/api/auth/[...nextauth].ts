import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt";

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

    async jwt({ token, user }: { token: JWT, user?: any }) {
      console.log("JWT callback:", { token, user });
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.name) {
        token.userName = user.name;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any;}) {
     try{
        const userData = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.picture,
          }),
        });

        const data = await userData.json();
        session.user = data;
        return session;

     }
      catch(err: any){
        console.log(err);
      }
      
    },

}
}

export default NextAuth(authOptions)