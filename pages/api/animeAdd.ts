import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";


// This code creates a new movie in the database using the data sent in the POST request. If the request method is not POST, it returns a 
// 405 status code. If there's an error while creating the movie, it returns a 400 status code.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { title, description, videoUrl, thumbnaiUrl, genre, duration } = req.body;

    const movie = await prismadb.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnaiUrl,
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