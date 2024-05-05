import { getTreeById } from '@/services/treeService'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(
  req: NextApiRequest,
  context: {params: {id: string}}
) {
    const data = await getTreeById(context.params.id)
    return NextResponse.json(data)
}