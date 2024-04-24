import { EnemyData } from '@/components/Enemy';
import React from 'react'
import { ReactDOM } from 'react'

interface AbilityProps {
    enemy: EnemyData
    AttackEnemy: (enemy:EnemyData, damage:number) => void
}

export default function Ability({AttackEnemy, enemy}:AbilityProps) {
    const damage = 1;

    return (
        <button onClick={() => AttackEnemy(enemy, damage)}>Attack</button>
    )
}