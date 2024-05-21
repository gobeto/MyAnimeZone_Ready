import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // Authenticate the request
    const { currentUser } = await serverAuth(req, res);

    // Fetch movies that the current user has marked as completed
    const completedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.completedIds,
        }
      }
    });
    
    // Return the list of completed movies as JSON
    return res.status(200).json(completedMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
} 