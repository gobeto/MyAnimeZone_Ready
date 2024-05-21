import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle POST requests to add anime to completed list
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;
  
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
      
      // Update user's completedIds to include the movieId
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          completedIds: {
            push: movieId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    // Handle DELETE requests to remove anime from completed list
    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      // Update user's completedIds to remove the movieId
      const updatedCompletedIds = without(currentUser.completedIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          completedIds: updatedCompletedIds,
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