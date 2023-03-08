import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query"],
  errorFormat: "minimal",
});

export const connectDB = () => {
  try {
    prisma.$connect();
    console.log("Database connection!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default prisma;
