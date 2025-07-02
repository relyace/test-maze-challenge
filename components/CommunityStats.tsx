'use client'

import React, { useEffect, useState } from 'react'

interface CommunityStatsProps {
  onlineUsers?: number
  newAnnouncesToday?: number
}

export default function CommunityStats({ 
  onlineUsers = 42, 
  newAnnouncesToday = 18 
}: CommunityStatsProps) {
  const [stats, setStats] = useState({
    onlineUsers,
    newAnnouncesToday,
    totalAnnouncements: 1247,
    activeMazeGames: 7
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 3) - 1,
        activeMazeGames: Math.max(0, prev.activeMazeGames + Math.floor(Math.random() * 3) - 1)
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="community-stats">
      <div className="container">
        <div className="stats-header">
          <h2>Communauté E-Tady</h2>
          <span className="live-indicator">
            <span className="pulse"></span>
            En direct
          </span>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon online">
              <UsersIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.onlineUsers}</div>
              <div className="stat-label">Utilisateurs en ligne</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon new">
              <PlusIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.newAnnouncesToday}</div>
              <div className="stat-label">Nouvelles annonces aujourd'hui</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon total">
              <TrendingIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalAnnouncements.toLocaleString()}</div>
              <div className="stat-label">Total des annonces</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon maze">
              <GameIcon />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.activeMazeGames}</div>
              <div className="stat-label">Parties de labyrinthe actives</div>
            </div>
          </div>
        </div>
        
        <div className="recent-activity">
          <h3>Activité récente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-user">Marie L.</span>
              <span className="activity-action">a publié une nouvelle annonce</span>
              <span className="activity-time">il y a 2 min</span>
            </div>
            <div className="activity-item">
              <span className="activity-user">Jean D.</span>
              <span className="activity-action">a terminé un labyrinthe</span>
              <span className="activity-time">il y a 5 min</span>
            </div>
            <div className="activity-item">
              <span className="activity-user">Sophie M.</span>
              <span className="activity-action">a aimé une annonce</span>
              <span className="activity-time">il y a 8 min</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .community-stats {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1e40af 100%);
          color: white;
          padding: 40px 0;
          margin-bottom: 32px;
        }
        
        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .stats-header h2 {
          font-size: 28px;
          font-weight: 700;
        }
        
        .live-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
        }
        
        .pulse {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .stat-icon.online {
          background: #10b981;
        }
        
        .stat-icon.new {
          background: var(--primary-yellow);
          color: var(--gray-800);
        }
        
        .stat-icon.total {
          background: #8b5cf6;
        }
        
        .stat-icon.maze {
          background: #f97316;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .recent-activity {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .recent-activity h3 {
          font-size: 18px;
          margin-bottom: 16px;
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
        }
        
        .activity-user {
          font-weight: 600;
          min-width: 80px;
        }
        
        .activity-action {
          flex: 1;
          opacity: 0.9;
        }
        
        .activity-time {
          font-size: 12px;
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          .stats-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </section>
  )
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function TrendingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
      <polyline points="17,6 23,6 23,12"/>
    </svg>
  )
}

function GameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}