import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Nếu không có env session sẽ hết hạn sau 15 phút
    maxAge: 60 * 15,
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signOut: "/",
  },
  callbacks: {
    async signIn(params) {
      const { user } = params;
      // Kiểm tra xem Gmail đã tồn tại trong bảng User chưa
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" },
      });

      if (existingUser) {
        return true;
      }

      // Tiếp tục tạo mới User với Gmail nếu chưa tồn tại
      await prisma.user.create({
        data: {
          email: user.email || "",
          name: user.name || "",
          address: ""
        },
      });
      return true;
    },
  },
};

export default NextAuth(authOptions);
