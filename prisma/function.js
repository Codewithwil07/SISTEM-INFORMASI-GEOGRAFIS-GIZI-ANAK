import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addData() {
  try {
    const newData = await prisma.user.create({
      data: {
        username: 'admin',
        password: 'admin',
      },
    });

    console.log('Data berhasil ditambahkan:', newData);
  } catch (error) {
    console.error('Error menambahkan data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addData();
