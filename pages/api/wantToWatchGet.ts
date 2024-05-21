import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // Authenticate the request and get the current user
    const { currentUser } = await serverAuth(req, res);

    // Fetch movies that the current user has marked as "want to watch"
    const WantToWatchMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.updatedWantToWatchIds,
        }
      }
    });

    return res.status(200).json(WantToWatchMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
} 