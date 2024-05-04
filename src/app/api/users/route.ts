
import { getUsers } from '@/services/userService'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(
  req: NextApiRequest
) {
    const data = await getUsers()
    return NextResponse.json(data)
}