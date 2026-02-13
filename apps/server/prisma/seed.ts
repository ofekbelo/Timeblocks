import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test user
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash: hashedPassword,
      fullName: 'Test User',
      emailVerified: true,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create test client
  const client = await prisma.client.create({
    data: {
      userId: user.id,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      color: '#4A90E2',
    },
  });

  console.log('✅ Created test client:', client.name);

  // Create test project
  const project = await prisma.project.create({
    data: {
      userId: user.id,
      clientId: client.id,
      name: 'Website Redesign',
      hourlyRate: 100,
      status: 'ACTIVE',
      color: '#7ED321',
    },
  });

  console.log('✅ Created test project:', project.name);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
