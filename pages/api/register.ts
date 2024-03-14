import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // const existingUser = await prismadb.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });

    // if (existingUser) {
    //   return res.status(422).json({ error: "Email taken" });
    // }

    // const hashedPassword = await bcrypt.hash(password, 12);

    // const user = await prismadb.user.create({
    //   data: {
    //     email,
    //     name,
    //     hashedPassword,
    //     emailVerified: new Date(),
    //     isAdmin: false,
    //   },
    // });
    // return res.status(200).json(user);
    
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ error: "Error hashing password" });
    }

    let user;
    try {
      user = await prismadb.user.create({
        data: {
          email,
          name,
          hashedPassword,
          emailVerified: new Date(),
          isAdmin: false,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Error creating user" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
