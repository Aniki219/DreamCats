
import { getTreeByUserName } from '@/services/userService'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(
  req: NextApiRequest,
  context: {params: {username: string}}
) {
    const data = await getTreeByUserName(context.params.username);
    return NextResponse.json(data)
}