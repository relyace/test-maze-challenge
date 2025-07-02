import { NextResponse } from 'next/server'

// Mock community stats data
const generateStats = () => ({
  onlineUsers: Math.floor(Math.random() * 50) + 20,
  newAnnouncesToday: Math.floor(Math.random() * 30) + 10,
  totalAnnouncements: 1247 + Math.floor(Math.random() * 100),
  activeMazeGames: Math.floor(Math.random() * 15) + 5,
  topCategories: [
    { name: 'Immobilier', count: 234 + Math.floor(Math.random() * 20) },
    { name: 'Automobile', count: 189 + Math.floor(Math.random() * 15) },
    { name: 'Électronique', count: 156 + Math.floor(Math.random() * 10) },
    { name: 'Services', count: 123 + Math.floor(Math.random() * 8) }
  ],
  recentActivity: [
    {
      id: '1',
      user: 'Marie L.',
      action: 'a publié une nouvelle annonce',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      type: 'announcement'
    },
    {
      id: '2',
      user: 'Jean D.',
      action: 'a terminé un labyrinthe',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      type: 'maze_complete'
    },
    {
      id: '3',
      user: 'Sophie M.',
      action: 'a aimé une annonce',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      type: 'like'
    },
    {
      id: '4',
      user: 'Alex R.',
      action: 'a partagé une annonce',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      type: 'share'
    }
  ],
  lastUpdated: new Date().toISOString()
})

export async function GET() {
  try {
    const stats = generateStats()
    
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error generating community stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}