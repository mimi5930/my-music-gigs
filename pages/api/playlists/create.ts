import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const playlistData = req.body;

  try {
    let { pieces } = playlistData;
    if (Array.isArray(pieces)) {
      let pieceArr: { id: string }[] = [];
      pieces.forEach(piece => {
        pieceArr.push({ id: piece });
      });
      pieces = pieceArr;
    } else {
      pieces = { id: pieces };
    }

    console.log(pieces);

    const newPlaylist = await prisma.playlist.create({
      data: { pieces: { connect: pieces } },
      include: { pieces: true }
    });
    res.status(200).json(newPlaylist);
    await prisma.$disconnect();
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
    await prisma.$disconnect();
  }
}
