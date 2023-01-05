import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { playlistId } = req.query;

  if (!playlistId) {
    res.status(403).json({ message: 'No id provided' });
    await prisma.$disconnect();
    return;
  }

  if (Array.isArray(playlistId)) {
    res.status(403).json({ message: 'Invalid query' });
    await prisma.$disconnect();
    return;
  }

  // GET
  if (req.method === 'GET') {
    try {
      const playlist = await prisma.playlist.findUnique({
        where: {
          id: playlistId
        },
        include: { pieces: true }
      });
      res.json(playlist);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    try {
      const playlist = await prisma.playlist.delete({
        where: {
          id: playlistId
        }
      });
      res.json(playlist);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }
}
