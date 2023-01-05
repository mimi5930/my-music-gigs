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

  if (req.method === 'PUT')
    try {
      let { pieces } = req.body;
      if (Array.isArray(pieces)) {
        let pieceArr: { id: string }[] = [];
        pieces.forEach(pieceId => {
          pieceArr.push({ id: pieceId });
        });
        pieces = pieceArr;
      } else {
        pieces = { id: pieces };
      }

      const addPiece = await prisma.playlist.update({
        where: { id: playlistId },
        data: { pieces: { disconnect: pieces } },
        include: { pieces: true }
      });
      res.json(addPiece);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      await prisma.$disconnect();
    }
}
