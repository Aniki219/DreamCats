import { findCatById, findCatByType, findCats } from "@/repos/catRepo";
import { NextResponse } from "next/server";



export async function getCats() {
    try {
        const data = await findCats();
        return data;
    } catch(e) {
        console.log(new NextResponse('Internal Error' + e));
    }
}

export async function getCatById(id:string) {
    try {
        const data = await findCatById(id);
        if (!data) {
            throw new NextResponse(`No cat found with id: ${id}`, {status: 404});
        }
        return data;
    } catch(e) {
        console.log('Internal Error:' + e);
    }
}

export async function fetchCatByType(type:string) {
    try {
        const data = await findCatByType(type);
        if (!data) {
            throw new NextResponse(`No cat found with type: ${type}`, {status: 404});
        }
        return data;
    } catch(e) {
        console.log('Internal Error:' + e);
    }
}