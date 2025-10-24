import { getElectronicsById } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const electronics = await getElectronicsById(decodeURIComponent(id))
    const availability = await getAvailability(electronics.id)
    
    return NextResponse.json({
      ...electronics,
      availability
    })
  } catch (error) {
    console.error('Error fetching electronics for terminal:', error)
    return NextResponse.json(
      { error: 'Electronics not found' },
      { status: 404 }
    )
  }
}
