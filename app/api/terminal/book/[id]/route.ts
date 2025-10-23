import { getBookById } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const book = await getBookById(decodeURIComponent(id))
    const availability = await getAvailability(book.id)
    
    return NextResponse.json({
      ...book,
      availability
    })
  } catch (error) {
    console.error('Error fetching book for terminal:', error)
    return NextResponse.json(
      { error: 'Book not found' },
      { status: 404 }
    )
  }
}
