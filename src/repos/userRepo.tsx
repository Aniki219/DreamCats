import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

export async function findUserById(id:string) {
    try {
        const result = await sql<User>`SELECT * FROM users WHERE id=${id}`
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export async function findUserByEmail(email:string) {
    try {
        const result = await sql<User>`SELECT * FROM users WHERE email=${email}`
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export async function findUserByUsername(username:string) {
    try {
        const result = await sql<User>`SELECT * FROM users WHERE username=${username}`
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export async function createUser(user:User) {
    try {
        const result = await sql<User>`INSERT INTO users (username, password, email) 
                                    VALUES (${user.username},${user.password},${user.email})`
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create user.');
    }
}