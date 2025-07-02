'use client'

import { useState, useCallback } from 'react'

interface SocialInteraction {
  id: string
  type: 'like' | 'share' | 'view'
  userId: string
  itemId: string
  createdAt: string
}

interface UseSocialInteractionsReturn {
  like: (itemId: string) => Promise<void>
  unlike: (itemId: string) => Promise<void>
  share: (itemId: string, platform?: string) => Promise<void>
  recordView: (itemId: string) => Promise<void>
  getLikes: (itemId: string) => Promise<number>
  getShares: (itemId: string) => Promise<number>
  getViews: (itemId: string) => Promise<number>
  isLiked: (itemId: string) => boolean
  loading: boolean
  error: string | null
}

export function useSocialInteractions(): UseSocialInteractionsReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const apiCall = useCallback(async (endpoint: string, data: any) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/interactions/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const like = useCallback(async (itemId: string) => {
    try {
      await apiCall('like', { itemId })
      setLikedItems(prev => new Set([...prev, itemId]))
    } catch (err) {
      console.error('Failed to like item:', err)
    }
  }, [apiCall])

  const unlike = useCallback(async (itemId: string) => {
    try {
      await apiCall('unlike', { itemId })
      setLikedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    } catch (err) {
      console.error('Failed to unlike item:', err)
    }
  }, [apiCall])

  const share = useCallback(async (itemId: string, platform?: string) => {
    try {
      await apiCall('share', { itemId, platform })
      
      // Handle native share if available
      if (navigator.share && !platform) {
        await navigator.share({
          title: 'Annonce intéressante sur E-Tady',
          url: `${window.location.origin}/annonce/${itemId}`
        })
      }
    } catch (err) {
      console.error('Failed to share item:', err)
      
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/annonce/${itemId}`)
        alert('Lien copié dans le presse-papiers !')
      } catch (clipboardErr) {
        console.error('Failed to copy to clipboard:', clipboardErr)
      }
    }
  }, [apiCall])

  const recordView = useCallback(async (itemId: string) => {
    try {
      await apiCall('view', { itemId })
    } catch (err) {
      console.error('Failed to record view:', err)
    }
  }, [apiCall])

  const getLikes = useCallback(async (itemId: string): Promise<number> => {
    try {
      const response = await fetch(`/api/interactions/likes/${itemId}`)
      const data = await response.json()
      return data.count || 0
    } catch (err) {
      console.error('Failed to get likes:', err)
      return 0
    }
  }, [])

  const getShares = useCallback(async (itemId: string): Promise<number> => {
    try {
      const response = await fetch(`/api/interactions/shares/${itemId}`)
      const data = await response.json()
      return data.count || 0
    } catch (err) {
      console.error('Failed to get shares:', err)
      return 0
    }
  }, [])

  const getViews = useCallback(async (itemId: string): Promise<number> => {
    try {
      const response = await fetch(`/api/interactions/views/${itemId}`)
      const data = await response.json()
      return data.count || 0
    } catch (err) {
      console.error('Failed to get views:', err)
      return 0
    }
  }, [])

  const isLiked = useCallback((itemId: string): boolean => {
    return likedItems.has(itemId)
  }, [likedItems])

  return {
    like,
    unlike,
    share,
    recordView,
    getLikes,
    getShares,
    getViews,
    isLiked,
    loading,
    error
  }
}