import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    try {
      const pieces = await prisma.piece.findMany();
      console.log(pieces);
      res.json(pieces);
      await prisma.$disconnect();
    } catch (e) {
      console.log(e);
      res.json(e);
      await prisma.$disconnect();
    }
  }

  // Delete pieces
  if (req.method === 'DELETE') {
    try {
      const resetPieces = await prisma.piece.deleteMany();
      res.status(200).json(resetPieces);
      await prisma.$disconnect();
    } catch (e) {
      res.status(500).json(e);
      await prisma.$disconnect();
    }
  }
}
