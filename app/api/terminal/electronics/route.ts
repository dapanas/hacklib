import { getAllElectronics } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const electronics = await getAllElectronics()
    
    // Get availability for each electronic component
    const electronicsWithAvailability = await Promise.all(
      electronics.map(async (electronic) => ({
        ...electronic,
        availability: await getAvailability(electronic.id)
      }))
    )
    
    return NextResponse.json(electronicsWithAvailability)
  } catch (error) {
    console.error('Error fetching electronics for terminal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch electronics' },
      { status: 500 }
    )
  }
}
