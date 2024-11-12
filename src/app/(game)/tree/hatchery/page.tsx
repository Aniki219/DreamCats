import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getHatcheryByTreeId } from "@/services/hatcheryService";
import { getNestsByHatcheryId } from "@/services/nestService";
import { getTreeByUserId, getUserByUsername } from "@/services/userService";

export default async function Hatchery() {
    const session = await auth();
    console.log(session);
    if (!session || !session.user || !session.user.name) {
        return;
    }

    const user = await getUserByUsername(session?.user?.name);
    if (!user) {
        return;
    }

    const tree = await getTreeByUserId(user.id);
    if (!tree) {
        return;
    }

    const hatchery = await getHatcheryByTreeId(tree.id);
    if (hatchery) {
        const nests = await getNestsByHatcheryId(hatchery.id);

        return (
            <>
                <h1>{user.username}'s Hatchery</h1>
                <ul>
                    {nests.map((nest, i) => {
                        return <li key={i}>Nest {i}</li>
                    })}
                </ul>
            </>
        )
    }

}