import { NextRequest, NextResponse } from 'next/server'

// Mock database for interactions
const interactions: Record<string, { likes: number; shares: number; views: number }> = {}

export async function POST(request: NextRequest) {
  try {
    const { itemId, type, userId = 'anonymous' } = await request.json()
    
    if (!itemId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize item if not exists
    if (!interactions[itemId]) {
      interactions[itemId] = { likes: 0, shares: 0, views: 0 }
    }

    // Update interaction count
    switch (type) {
      case 'like':
        interactions[itemId].likes++
        break
      case 'unlike':
        interactions[itemId].likes = Math.max(0, interactions[itemId].likes - 1)
        break
      case 'share':
        interactions[itemId].shares++
        break
      case 'view':
        interactions[itemId].views++
        break
      default:
        return NextResponse.json(
          { error: 'Invalid interaction type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      itemId,
      type,
      counts: interactions[itemId]
    })
  } catch (error) {
    console.error('Error processing interaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const itemId = url.searchParams.get('itemId')
    
    if (!itemId) {
      return NextResponse.json(
        { error: 'Missing itemId parameter' },
        { status: 400 }
      )
    }

    const itemInteractions = interactions[itemId] || { likes: 0, shares: 0, views: 0 }
    
    return NextResponse.json({
      itemId,
      ...itemInteractions
    })
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}