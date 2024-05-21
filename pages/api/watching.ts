import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // Handle POST requests to add a movie to the user's "watching" list
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      // Check if the movie exists in the database
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
      
      // Update user's watchingIds to include the movieId
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          watchingIds: {
            push: movieId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    // Handle DELETE requests to remove a movie from the user's "watching" list
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      // Check if the movie exists in the database
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      // Update user's watchingIds to remove the movieId
      const updatedWatchingIds = without(currentUser.watchingIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          watchingIds: updatedWatchingIds,
        }
      }); 

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}