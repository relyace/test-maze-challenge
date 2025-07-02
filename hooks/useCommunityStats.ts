'use client'

import { useState, useEffect, useCallback } from 'react'

interface CommunityStats {
  onlineUsers: number
  newAnnouncesToday: number
  totalAnnouncements: number
  activeMazeGames: number
  topCategories: Array<{
    name: string
    count: number
  }>
  recentActivity: Array<{
    id: string
    user: string
    action: string
    timestamp: string
    type: 'announcement' | 'like' | 'share' | 'maze_complete'
  }>
}

interface UseCommunityStatsReturn {
  stats: CommunityStats | null
  loading: boolean
  error: string | null
  refreshStats: () => Promise<void>
  subscribeToRealTimeUpdates: () => void
  unsubscribeFromRealTimeUpdates: () => void
}

export function useCommunityStats(): UseCommunityStatsReturn {
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [eventSource, setEventSource] = useState<EventSource | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/community/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch community stats')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      
      // Fallback to mock data if API fails
      setStats({
        onlineUsers: 42,
        newAnnouncesToday: 18,
        totalAnnouncements: 1247,
        activeMazeGames: 7,
        topCategories: [
          { name: 'Immobilier', count: 234 },
          { name: 'Automobile', count: 189 },
          { name: 'Électronique', count: 156 },
          { name: 'Services', count: 123 }
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
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshStats = useCallback(async () => {
    await fetchStats()
  }, [fetchStats])

  const subscribeToRealTimeUpdates = useCallback(() => {
    if (eventSource) {
      return // Already subscribed
    }

    try {
      const es = new EventSource('/api/community/stats/stream')
      
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setStats(prevStats => ({
            ...prevStats,
            ...data
          }))
        } catch (err) {
          console.error('Failed to parse real-time stats:', err)
        }
      }

      es.onerror = (event) => {
        console.error('EventSource failed:', event)
        es.close()
        setEventSource(null)
      }

      setEventSource(es)
    } catch (err) {
      console.error('Failed to establish EventSource connection:', err)
    }
  }, [eventSource])

  const unsubscribeFromRealTimeUpdates = useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
    }
  }, [eventSource])

  // Simulate real-time updates when EventSource is not available
  useEffect(() => {
    if (!stats) return

    const interval = setInterval(() => {
      setStats(prevStats => {
        if (!prevStats) return prevStats
        
        return {
          ...prevStats,
          onlineUsers: Math.max(1, prevStats.onlineUsers + Math.floor(Math.random() * 6) - 2),
          activeMazeGames: Math.max(0, prevStats.activeMazeGames + Math.floor(Math.random() * 3) - 1)
        }
      })
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [stats])

  // Initial fetch
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Cleanup
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [eventSource])

  return {
    stats,
    loading,
    error,
    refreshStats,
    subscribeToRealTimeUpdates,
    unsubscribeFromRealTimeUpdates
  }
}