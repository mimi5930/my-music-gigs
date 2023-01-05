import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const { pieceId } = req.query;

  if (!pieceId) {
    res.status(403).json({ message: 'No id provided' });
    await prisma.$disconnect();
    return;
  }

  if (Array.isArray(pieceId)) {
    res.status(403).json({ message: 'Invalid query' });
    await prisma.$disconnect();
    return;
  }

  // GET
  if (req.method === 'GET') {
    try {
      const piece = await prisma.piece.findUnique({
        where: {
          id: pieceId
        }
      });
      res.json(piece);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    try {
      const piece = await prisma.piece.delete({
        where: {
          id: pieceId
        }
      });
      res.json(piece);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }

  // UPDATE
  if (req.method === 'PUT') {
    const { name, composer, length, link } = req.body;
    try {
      const updatePiece = await prisma.piece.update({
        where: {
          id: pieceId
        },
        data: {
          name: name,
          composer: composer,
          length: length,
          link: link
        }
      });
      res.json(updatePiece);
      await prisma.$disconnect();
    } catch (e) {
      res.json(e);
      await prisma.$disconnect();
    }
  }
}
