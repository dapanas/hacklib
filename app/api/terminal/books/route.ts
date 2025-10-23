import { getAllBooks } from '@/lib/data'
import { getAvailability } from '@/lib/availability'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await getAllBooks()
    
    // Get availability for each book
    const booksWithAvailability = await Promise.all(
      books.map(async (book) => ({
        ...book,
        availability: await getAvailability(book.id)
      }))
    )
    
    return NextResponse.json(booksWithAvailability)
  } catch (error) {
    console.error('Error fetching books for terminal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}
