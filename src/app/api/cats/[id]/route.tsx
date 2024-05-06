import { getCatById, getEntity } from '@/services/catService'
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(
    req: NextApiRequest,
    context: { params: { id: string } }
) {
    const data = await getEntity({ type: "Wrench" })
    return NextResponse.json(data)
}