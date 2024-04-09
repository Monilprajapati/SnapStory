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
    async session({ token }: any) {
      // console.log("session", session);
      console.log("===============================================");
      console.log("token", token);
      token.name = `${token?.name}_${token?.sub}`;

      return token;
    },
  },
  secret: "default_secret_key",
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
