//delete
import { Movie } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
    } = req;

    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    try {
        const movie: Movie | null = await fetchAnimeFromDatabase(id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Anime not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the anime' });
    }
}

const prisma = new PrismaClient();

async function fetchAnimeFromDatabase(id: string): Promise<Movie | null> {
    return await prisma.movie.findUnique({
        where: {
            id: id,
        },
    });
}