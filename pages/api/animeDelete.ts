import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

// This code delete an anime in the database using the data sent in the DELETE request. If the request method is not DELETE, it returns a 
// 405 status code. If there's an error while deleting the movie, it returns a 400 status code.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { id } = req.body;

    const movie = await prismadb.movie.delete({
      where: { id },
    });

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}