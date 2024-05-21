import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

// This code edit an anime in the database using the data sent in the PUT request. If the request method is not POST, it returns a 
// 405 status code. If there's an error while editing the anime, it returns a 400 status code.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  try {
    const { title, description, videoUrl, thumbnaiUrl, posterUrl, genre, duration, id } = req.body;

    const movie = await prismadb.movie.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl,
        thumbnaiUrl,
        posterUrl,
        genre,
        duration,
      },
    });

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}