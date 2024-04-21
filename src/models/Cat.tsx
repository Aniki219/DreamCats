import React, { useState } from 'react'

export interface CatData {
    id:number;
    name:string;
}

export default function Cat({name}:CatData) {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    );
}