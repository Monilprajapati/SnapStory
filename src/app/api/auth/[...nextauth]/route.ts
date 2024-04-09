import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "503427992053-ovherbj724i5k9i169k3g5sgdn8hq3fk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      // console.log("session", session);
      session.user.name = `${session?.user?.name}_${token?.sub}`;
      return session;
    },
  },
  secret: "default_secret_key",
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
