import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    let existingUser;

    try{
    try {
      existingUser = await prismadb.user.findUnique({
        where: {
          email
        }
      });
    } catch (error) {
      return res.status(400).json({ error: `Something went up wrong: ${error}` });
    }

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }
  } catch (error) {
    return res.status(400).json({ error: `Something went down wrong: ${error}` });
  }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}