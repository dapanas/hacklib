import { getAllBoardGames } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const boardGames = await getAllBoardGames()
    
    // Get availability for each board game
    const boardGamesWithAvailability = await Promise.all(
      boardGames.map(async (boardGame) => ({
        ...boardGame,
        availability: await getAvailability(boardGame.id)
      }))
    )
    
    return NextResponse.json(boardGamesWithAvailability)
  } catch (error) {
    console.error('Error fetching board games for terminal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch board games' },
      { status: 500 }
    )
  }
}
