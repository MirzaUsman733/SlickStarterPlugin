import NextAuth from 'next-auth';
import { Account, User as AuthUser } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connect from '@/utils/db';

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              if (user.approved) {
                return user;
              } else {
                // User is not approved, return appropriate error message
                throw new Error('Admin approval pending');
              }
            } else {
              // Incorrect password, return appropriate error message
              throw new Error('User Password is incorrect');
            }
          } else {
            // User not found or invalid credentials, return appropriate error message
            throw new Error('Invalid email or password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == 'credentials') {
        return true;
      }
      if (account?.provider == 'github') {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              role: 'user',
              approved: false,
            });

            await newUser.save();
            return false;
          } else {
            if (existingUser.approved) {
              return true; // Approved users can sign in
            } else {
              // User exists but is not approved
              console.log('User approval pending');
              return false;
            }
          }
        } catch (err) {
          console.log('Error saving user', err);
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
