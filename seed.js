import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'admin', password: '1234', isAdmin: true },
      { username: 'user', password: '1234', isAdmin: false }
    ],
  });

  await prisma.book.createMany({
    data: [
      { title: '1984', autor: 'George Orwell', available: true },
      { title: 'Dom Casmurro', autor: 'Machado de Assis', available: true },
      { title: 'Harry Potter', autor: 'J.K. Rowling', available: false },
      { title: 'Clean Code', autor: 'Robert Martin', available: true }
    ],
  });

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
