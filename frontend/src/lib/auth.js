import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

export const client = new MongoClient(process.env.MONGODB_URI);
export const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      plan: {
        default: "seeker-free",
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "seeker",
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});


