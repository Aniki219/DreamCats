import { Attributes, Prisma, Role } from '@prisma/client'
import { ParseArgsConfig, parseArgs } from 'node:util'
import bcryptjs from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import { createCat, getCatGoogleSheetData, getCats } from '@/services/catService';
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

            const catData = await getCatGoogleSheetData();
            await prisma.cat.createMany({
                data: catData
            })

            const cats = await getCats();

            const myCat = await createUserCat({ user: AtlasMoth, cat: cats[0] });

            if (cats.length >= 4) {
                await createUserCat({ user: AtlasMoth, cat: cats[1] });
                await createUserCat({ user: AtlasMoth, cat: cats[2] });
                await createUserCat({ user: AtlasMoth, cat: cats[3] });
            }

            const egg = await createEgg({ parentUserId: myCat.userId, parentCatId: myCat.catId });

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