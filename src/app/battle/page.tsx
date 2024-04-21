"use client"

import Link from "next/link";
import styles from "./page.module.css";
import Enemy, {EnemyData} from "@/models/Enemy";
import React, { useEffect, useRef, useState } from 'react'
import Ability from "@/models/Ability";

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

            <Link href="tree">Back to Tree</Link>
        </div>
    );  
}
