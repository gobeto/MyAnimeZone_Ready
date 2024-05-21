import { PrismaClient } from "@prisma/client";

// Create a new PrismaClient instance or reuse the existing global instance
const client = global.prismadb || new PrismaClient();

// In production, assign the PrismaClient instance to a global variable
if(process.env.NODE_ENV == 'production')global.prismadb=client;

export default client;