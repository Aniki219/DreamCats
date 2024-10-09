import { Attributes, Role } from '@prisma/client'
import { ParseArgsConfig, parseArgs } from 'node:util'
import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import { upsertCat } from '@/services/catService';

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
            const otterpun = {
                species: "otterpun",
                attributes: [Attributes.AQUATIC, Attributes.MISCHIEVOUS],
                strength: 10,
                defense: 12,
                magicDefense: 15,
                intelligence: 8,
                speed: 10,
                health: 30,
                mana: 25
            }
            const quickat = {
                species: "quickat",
                attributes: [Attributes.SPEEDY],
                strength: 10,
                defense: 12,
                magicDefense: 15,
                intelligence: 8,
                speed: 20,
                health: 20,
                mana: 25
            }
            const mercat = {
                species: "mercat",
                attributes: [Attributes.AQUATIC, Attributes.SPEEDY],
                strength: 10,
                defense: 12,
                magicDefense: 15,
                intelligence: 8,
                speed: 10,
                health: 30,
                mana: 25
            }
            const jellyfel = {
                species: "jellyfel",
                attributes: [Attributes.AQUATIC, Attributes.SPEEDY, Attributes.MISCHIEVOUS],
                strength: 10,
                defense: 12,
                magicDefense: 15,
                intelligence: 8,
                speed: 10,
                health: 30,
                mana: 25
            }
            upsertCat(otterpun);
            upsertCat(quickat);
            upsertCat(mercat);
            upsertCat(jellyfel);
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