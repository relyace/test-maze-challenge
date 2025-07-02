'use client'

import React, { useState } from 'react'

interface SocialHeaderProps {
  userName?: string
  notificationCount?: number
}

export default function SocialHeader({ userName = "Utilisateur", notificationCount = 3 }: SocialHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="social-header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1>E-Tady</h1>
            <span className="beta-tag">Social</span>
          </div>
          
          <nav className="social-nav">
            <button className="nav-item">
              <MessageIcon />
              <span>Messages</span>
            </button>
            
            <button className="nav-item">
              <NotificationIcon />
              <span>Notifications</span>
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
            
            <button 
              className="profile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span>{userName}</span>
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu">
                <a href="/profile">Mon Profil</a>
                <a href="/settings">Paramètres</a>
                <a href="/maze">Jeu Labyrinthe</a>
                <hr />
                <a href="/logout">Déconnexion</a>
              </div>
            )}
          </nav>
        </div>
      </div>
      
      <style jsx>{`
        .social-header {
          background: white;
          border-bottom: 1px solid var(--gray-200);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .logo-section h1 {
          color: var(--primary-blue);
          font-size: 24px;
          font-weight: bold;
        }
        
        .beta-tag {
          background: var(--primary-yellow);
          color: var(--gray-800);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .social-nav {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
        }
        
        .nav-item:hover {
          background-color: var(--gray-100);
        }
        
        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #dc2626;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-menu {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .profile-menu:hover {
          background-color: var(--gray-100);
        }
        
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          padding: 8px 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 160px;
        }
        
        .dropdown-menu a {
          display: block;
          padding: 8px 16px;
          color: var(--gray-800);
          text-decoration: none;
          transition: background-color 0.2s;
        }
        
        .dropdown-menu a:hover {
          background-color: var(--gray-100);
        }
        
        .dropdown-menu hr {
          margin: 8px 0;
          border: none;
          border-top: 1px solid var(--gray-200);
        }
      `}</style>
    </header>
  )
}

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function NotificationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}