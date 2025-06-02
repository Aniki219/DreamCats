import { Prisma, Egg, UserCat, Cat } from '@prisma/client'
import { Egg as EggIcon } from 'lucide-react'
import React from 'react'

type NestParams = {
    number: number,
    egg: Egg,
    hatcher: UserCat,
    parent: UserCat & Cat
}

export default function Nest({ number, egg, hatcher, parent }: NestParams) {
    return (
        <li>
            <h3>Nest {number}</h3>
            hatcher && <div>
                <h4>Hatcher: {hatcher.name}</h4>
            </div>
            egg && <div>
                <h4>Parent: {parent.name} ({parent.species})</h4>
                <EggIcon />
            </div>
        </li>
    )
}
