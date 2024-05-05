import { Role } from '@prisma/client'
import { ParseArgsConfig, parseArgs } from 'node:util'
import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  environment: { type: 'string' },
}

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options } as ParseArgsConfig)

  switch (environment) {
    case 'development':
        const AtlasMoth = await prisma.user.upsert({
            where: { email: 'AtlasMoth.dev@gmail.com' },
            update: {},
            create: {
              email: 'AtlasMoth.dev@gmail.com',
              username: 'AtlasMoth',
              password: await bcryptjs.hash(process.env.ADMIN_PASSWORD as string, 10),
              tree: {
                create: {
                  name: "AtlasMoth's Tree"
                },
              },
              roles: [Role.ADMIN, Role.USER]
            },
          })
      break
    case 'test':
      /** data for your test environment */
      break
    default:
      break
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })