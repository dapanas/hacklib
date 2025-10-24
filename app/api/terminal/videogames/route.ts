import { getAllVideoGames } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const videoGames = await getAllVideoGames()
    
    // Get availability for each video game
    const videoGamesWithAvailability = await Promise.all(
      videoGames.map(async (videoGame) => ({
        ...videoGame,
        availability: await getAvailability(videoGame.id)
      }))
    )
    
    return NextResponse.json(videoGamesWithAvailability)
  } catch (error) {
    console.error('Error fetching video games for terminal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video games' },
      { status: 500 }
    )
  }
}
