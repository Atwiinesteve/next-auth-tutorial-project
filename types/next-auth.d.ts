<<<<<<< HEAD
// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Add the `role` property
  }

  interface Session {
    user?: User & {
      role?: string; // Optionally add `role` to the session user
    };
  }
}
=======

// import "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     //   role: string; // Add the role field
//     };
//   }

//   interface User {
//     role: string; // Add the role field
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     // role: string; // Add the role field
//   }
// }
>>>>>>> ba4d7f26062ef11cec5246217f51e522bc072f7b
