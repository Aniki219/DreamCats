import React, { useState } from 'react'

export type EnemyData = {
    maxhealth:number,
    health:number
}

export default function Enemy({health, maxhealth}:EnemyData) {


    return (
        <div>
            <h2>Enemy</h2>
            <p>HP: {health} / {maxhealth}</p>
        </div>
    );
}