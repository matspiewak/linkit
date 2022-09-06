import NextAuth, { Account, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

type NewAccount =
    | (Account & {
          accessTokenExpires: Date;
          refreshToken: string;
          expires_in: number;
          accessToken: string;
      })
    | null;

//? async function refreshAccessToken(userId: string, newAccount: NewAccount) {
//     try {
//         const userAccount = (await prisma.account.findFirst({
//             where: { userId },
//         })) as NewAccount;
//         if (!userAccount) {
//             return;
//         }
//         if (userAccount.accessTokenExpires) {
//             if (new Date() < userAccount.accessTokenExpires) {
//                 return;
//             }
//         }

//         const refreshToken = userAccount.refreshToken;
//         //                      ^?

//         const url =
//             'https://oauth2.googleapis.com/token?' +
//             new URLSearchParams({
//                 client_id: process.env.GOOGLE_CLIENT_ID,
//                 client_secret: process.env.GOOGLE_CLIENT_SECRET,
//                 grant_type: 'refresh_token',
//                 refresh_token: refreshToken,
//             });

//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             method: 'POST',
//         });

//         const refreshedTokens = await response.json();

//         if (!response.ok) {
//             if (refreshedTokens.error === 'invalid_grant') {
//                 await prisma.account.update({
//                     where: { id: userAccount.id as string },
//                     data: {
//                         refreshToken: newAccount.refreshToken,
//                         accessToken: newAccount!.accessToken,
//                         accessTokenExpires: new Date(
//                             Date.now() + newAccount!.expires_in * 1000
//                         ),
//                     },
//                 });
//                 return;
//             }
//             throw refreshedTokens;
//         }

//         await prisma.account.update({
//             where: { id: userAccount.id as string },
//             data: {
//                 refreshToken: refreshedTokens.refresh_token ?? refreshToken,
//                 accessToken: refreshedTokens.access_token,
//                 accessTokenExpires: new Date(
//                     Date.now() + refreshedTokens.expires_in * 1000
//                 ),
//             },
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    //? events: {
    //     async signIn(payload) {
    //         await refreshAccessToken(
    //             payload.user.id,
    //             payload.account as NewAccount
    //         );
    //     },
    // },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'database',
        maxAge: 60 * 60 * 24,
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            return session;
        },
    },
};

export default NextAuth(authOptions);
