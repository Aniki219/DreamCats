import React, { useState } from 'react'

export interface CatData {
    id:string;
    type:string;
}

export default function Cat({type}:CatData) {
    return (
        <div>
            <h2>{type}</h2>
        </div>
    );
}