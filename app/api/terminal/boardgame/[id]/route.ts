import { getBoardGameById } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const boardGame = await getBoardGameById(decodeURIComponent(id))
    const availability = await getAvailability(boardGame.id)
    
    return NextResponse.json({
      ...boardGame,
      availability
    })
  } catch (error) {
    console.error('Error fetching board game for terminal:', error)
    return NextResponse.json(
      { error: 'Board game not found' },
      { status: 404 }
    )
  }
}
