import { getTrees } from '@/services/treeService'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(
  req: NextApiRequest
) {
    const data = await getTrees()
    return NextResponse.json(data)
}