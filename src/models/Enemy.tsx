import React, { useState } from 'react'

export class EnemyData {
    maxhealth:number;
    health:number;

    constructor(maxhp:number) {
        this.maxhealth = maxhp;
        this.health = maxhp;
    }
}

export default function Enemy({health, maxhealth}:EnemyData) {


    return (
        <div>
            <h2>Enemy</h2>
            <p>HP: {health} / {maxhealth}</p>
        </div>
    );
}