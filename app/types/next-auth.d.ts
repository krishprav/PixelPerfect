// app/types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; 
      token?: string; 
      email?: string;
      image?: string;
    };
  }
}