import { Attributes, Prisma, Role } from '@prisma/client'
import { ParseArgsConfig, parseArgs } from 'node:util'
import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import { createCat } from '@/services/catService';
import { createUserCat } from '@/services/userCatService';
import { User } from 'next-auth';
import { createEgg } from '@/services/eggService';
import { createHatchery } from '@/services/hatcheryService';
import { getTreeById } from '@/services/treeService';
import { saveUser } from '@/services/userService';
import { addEggToNest, getNestById, getNestsByHatcheryId } from '@/services/nestService';

const prisma = new PrismaClient();

const options = {
    environment: { type: 'string' },
}

async function main() {
    const {
        values: { environment },
    } = parseArgs({ options } as ParseArgsConfig)

    console.log("Seeding with environment=" + environment);

    switch (environment) {
        case 'development':
            const AtlasMoth = await saveUser({
                email: 'AtlasMoth.dev@gmail.com',
                username: 'AtlasMoth',
                password: await bcryptjs.hash(process.env.ADMIN_PASSWORD as string, 10),
                roles: [Role.ADMIN, Role.USER]
            })

            const tree = await getTreeById(AtlasMoth.treeId!);

            const otterpunInput = {
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
            const otterpun = await createCat(otterpunInput);
            createCat(quickat);
            createCat(mercat);
            createCat(jellyfel);

            const myOtterpun = await createUserCat({ name: "My Otterpun", userId: AtlasMoth.id!, catId: otterpun.id });
            const egg = await createEgg({ parentUserId: myOtterpun.userId, parentCatId: myOtterpun.catId });

            const hatchery = await createHatchery(tree!.id);
            const nests = await getNestsByHatcheryId(hatchery.id);
            const nest = nests[0];

            await addEggToNest(nest.id, egg.id);
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