import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { pieces: true }
      });
      res.json(playlists);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }

  if (req.method === 'DELETE') {
    try {
      const resetPlaylists = await prisma.playlist.deleteMany();
      res.status(200).json(resetPlaylists);
      await prisma.$disconnect();
    } catch (e) {
      res.status(500).json(e);
      await prisma.$disconnect();
    }
  }
}
