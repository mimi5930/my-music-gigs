import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type PieceBody = {
  name: string;
  composer: string;
  length: number;
  link?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const pieceData: PieceBody = req.body;

  try {
    const newPiece = await prisma.piece.create({
      data: {
        name: pieceData.name,
        composer: pieceData.composer,
        length: pieceData.length,
        link: pieceData.link
      }
    });
    res.status(200).json(newPiece);
    await prisma.$disconnect();
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
    await prisma.$disconnect();
  }
}
