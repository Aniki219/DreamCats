"use client"

import Link from "next/link";
import styles from "./page.module.css";
import Enemy from "@/models/Enemy";
import React, { useEffect, useRef, useState } from 'react'
import Ability from "@/models/Ability";

export class EnemyData {
    maxhealth:number;
    health:number;

    constructor(maxhp:number) {
        this.maxhealth = maxhp;
        this.health = maxhp;
    }
}

export class AbilityData {
    
}

export default function Battle() {
    const [enemy, setEnemy] = useState(new EnemyData(3));

    const AttackEnemy = (enemy:EnemyData, damage:number) => {
        let {health} = enemy;
        health-=damage
        setEnemy({...enemy, health});
    }

    const GetBattleUI = () => {
        if (enemy.health > 0) {
            return (
                <>
                    <Enemy health={enemy.health} maxhealth={enemy.maxhealth}></Enemy>
                    <Ability AttackEnemy={AttackEnemy} enemy={enemy}></Ability>
                </>
            )
        } else {
            return (
                <>
                    You Win!
                </>
            )
        }
    }

    return (
        <div>
            <h1>Battle Page</h1>

            {GetBattleUI()}

            <Link href="/">Home Page</Link>
        </div>
    );  
}
