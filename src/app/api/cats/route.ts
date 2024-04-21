import { fetchCats } from '@/services/CatService';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
  try {
    const cats = await fetchCats();
    return NextResponse.json({ cats });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}