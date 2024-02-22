import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

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