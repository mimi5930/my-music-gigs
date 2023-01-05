import { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

type Pieces = {
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

  let { number } = req.query;

  if (!number) {
    number = '30';
  }
  if (Array.isArray(number)) {
    number = number[0];
  }

  // create pieces
  const createdPieces = await createPieces(Number(number));

  // delete existing pieces from db
  try {
    await prisma.piece.deleteMany();
  } catch (e) {
    await prisma.$disconnect();
    throw e;
  }
  console.log('Deleted existing pieces');

  // add new pieces
  try {
    const response = await prisma.piece.createMany({ data: createdPieces });
    res.json(response);
  } catch (e) {
    await prisma.$disconnect();
    throw e;
  }
  console.log('Added pieces');

  await prisma.$disconnect();
}

async function createPieces(amount: number): Promise<Pieces[]> {
  let pieces: Pieces[] = [];

  for (let i = 0; i < amount; i++) {
    let randomName = faker.music.songName();
    let randomComposer = faker.name.fullName();
    let randomLength = faker.datatype.number({ min: 120, max: 380 });
    let hasLink = faker.datatype.boolean();

    let piece;
    hasLink
      ? (piece = {
          name: randomName,
          composer: randomComposer,
          length: randomLength,
          link: faker.internet.domainName()
        })
      : (piece = {
          name: randomName,
          composer: randomComposer,
          length: randomLength
        });

    pieces = [...pieces, piece];
  }

  return pieces;
}
