import { getVideoGameById } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const videoGame = await getVideoGameById(decodeURIComponent(id))
    const availability = await getAvailability(videoGame.id)
    
    return NextResponse.json({
      ...videoGame,
      availability
    })
  } catch (error) {
    console.error('Error fetching video game for terminal:', error)
    return NextResponse.json(
      { error: 'Video game not found' },
      { status: 404 }
    )
  }
}
