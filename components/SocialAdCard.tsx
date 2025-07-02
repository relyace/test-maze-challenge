'use client'

import React, { useState } from 'react'

interface SocialAdCardProps {
  id: string
  title: string
  description: string
  author: string
  authorAvatar?: string
  price?: string
  location: string
  imageUrl?: string
  likes: number
  views: number
  isNew?: boolean
  createdAt: string
  category: string
}

export default function SocialAdCard({
  id,
  title,
  description,
  author,
  authorAvatar,
  price,
  location,
  imageUrl,
  likes: initialLikes,
  views,
  isNew = false,
  createdAt,
  category
}: SocialAdCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
    
    // Here you would call the API to update likes
    // useSocialInteractions hook would handle this
  }

  const handleShare = () => {
    // Implement share functionality
    navigator.share?.({
      title: title,
      text: description,
      url: `${window.location.origin}/annonce/${id}`
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/annonce/${id}`)
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'à l\'instant'
    if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)}h`
    return `il y a ${Math.floor(diffInSeconds / 86400)} jours`
  }

  return (
    <article 
      className="social-ad-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && <div className="new-badge">Nouveau</div>}
      
      <div className="card-header">
        <div className="author-info">
          <div className="author-avatar">
            {authorAvatar ? (
              <img src={authorAvatar} alt={author} />
            ) : (
              author.charAt(0).toUpperCase()
            )}
          </div>
          <div className="author-details">
            <span className="author-name">{author}</span>
            <span className="post-time">{formatTimeAgo(createdAt)}</span>
          </div>
        </div>
        <div className="category-badge">{category}</div>
      </div>

      <div className="card-content">
        {imageUrl && (
          <div className="card-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
        
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          
          <div className="card-meta">
            <div className="location">
              <LocationIcon />
              {location}
            </div>
            {price && (
              <div className="price">{price}</div>
            )}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <div className="social-stats">
          <span className="stat">
            <EyeIcon />
            {views} vues
          </span>
          <span className="stat">
            <HeartIcon />
            {likes} j'aime
          </span>
        </div>
        
        <div className="social-buttons">
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <HeartIcon />
            J'aime
          </button>
          
          <button 
            className="share-button"
            onClick={handleShare}
          >
            <ShareIcon />
            Partager
          </button>
          
          <button className="contact-button">
            <MessageCircleIcon />
            Contacter
          </button>
        </div>
      </div>

      {isHovered && (
        <div className="quick-preview">
          <p>Aperçu rapide: {description.substring(0, 100)}...</p>
          <button className="preview-button">Voir plus</button>
        </div>
      )}
      
      <style jsx>{`
        .social-ad-card {
          background: white;
          border-radius: 12px;
          padding: 0;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .social-ad-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .new-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #dc2626;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          z-index: 2;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--gray-200);
        }
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          overflow: hidden;
        }
        
        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .author-details {
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-weight: 600;
          color: var(--gray-800);
        }
        
        .post-time {
          font-size: 12px;
          color: var(--gray-600);
        }
        
        .category-badge {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .card-content {
          padding: 0;
        }
        
        .card-image {
          height: 200px;
          overflow: hidden;
        }
        
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .social-ad-card:hover .card-image img {
          transform: scale(1.05);
        }
        
        .card-body {
          padding: 20px;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .card-description {
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--gray-600);
          font-size: 14px;
        }
        
        .price {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary-blue);
        }
        
        .card-actions {
          padding: 16px 20px;
          border-top: 1px solid var(--gray-200);
          background: var(--gray-100);
        }
        
        .social-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--gray-600);
          font-size: 14px;
        }
        
        .social-buttons {
          display: flex;
          gap: 8px;
        }
        
        .social-buttons button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }
        
        .like-button {
          background-color: var(--gray-200);
          color: var(--gray-600);
        }
        
        .like-button.liked {
          background-color: #fef2f2;
          color: #dc2626;
        }
        
        .share-button {
          background-color: var(--primary-blue);
          color: white;
        }
        
        .contact-button {
          background-color: var(--primary-yellow);
          color: var(--gray-800);
        }
        
        .social-buttons button:hover {
          transform: translateY(-1px);
        }
        
        .quick-preview {
          position: absolute;
          bottom: 100%;
          left: 20px;
          right: 20px;
          background: var(--gray-800);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          animation: slideUp 0.3s ease forwards;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .preview-button {
          background: var(--primary-blue);
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          margin-top: 8px;
          cursor: pointer;
          font-size: 12px;
        }
      `}</style>
    </article>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function MessageCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}