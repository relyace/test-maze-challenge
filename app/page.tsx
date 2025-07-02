'use client'

import React from 'react'
import SocialHeader from '../components/SocialHeader'
import CommunityStats from '../components/CommunityStats'
import SocialAdCard from '../components/SocialAdCard'

// Mock data for demonstration
const mockAds = [
  {
    id: '1',
    title: 'Appartement 2 pièces centre-ville',
    description: 'Magnifique appartement rénové avec vue sur le parc. Proche de tous les commerces et transports.',
    author: 'Marie Laurent',
    authorAvatar: '',
    price: '450 000 €',
    location: 'Antananarivo, Madagascar',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    likes: 24,
    views: 156,
    isNew: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    category: 'Immobilier'
  },
  {
    id: '2',
    title: 'Voiture Toyota Corolla 2019',
    description: 'Véhicule en excellent état, entretien régulier, toutes révisions effectuées. Non fumeur.',
    author: 'Jean Rakoto',
    authorAvatar: '',
    price: '15 000 €',
    location: 'Toamasina, Madagascar',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
    likes: 12,
    views: 89,
    isNew: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    category: 'Automobile'
  },
  {
    id: '3',
    title: 'Cours de piano particuliers',
    description: 'Professeur diplômé donne cours de piano tous niveaux. Méthode adaptée à chaque élève.',
    author: 'Sophie Randria',
    authorAvatar: '',
    price: '25 €/heure',
    location: 'Fianarantsoa, Madagascar',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop',
    likes: 8,
    views: 45,
    isNew: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    category: 'Services'
  },
  {
    id: '4',
    title: 'Ordinateur portable gaming',
    description: 'PC portable gamer haute performance, parfait pour les jeux récents et le travail créatif.',
    author: 'Alex Randriamana',
    authorAvatar: '',
    price: '1 200 €',
    location: 'Mahajanga, Madagascar',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    likes: 31,
    views: 203,
    isNew: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    category: 'Électronique'
  }
]

export default function HomePage() {
  return (
    <div className="homepage">
      <SocialHeader userName="Utilisateur Demo" notificationCount={3} />
      
      <main>
        <CommunityStats onlineUsers={42} newAnnouncesToday={18} />
        
        <div className="container">
          <div className="main-content">
            <div className="feed-section">
              <div className="feed-header">
                <h2>Fil d'actualités</h2>
                <div className="feed-filters">
                  <button className="filter-btn active">Récentes</button>
                  <button className="filter-btn">Populaires</button>
                  <button className="filter-btn">Recommandées</button>
                </div>
              </div>
              
              <div className="ads-feed">
                {mockAds.map(ad => (
                  <SocialAdCard key={ad.id} {...ad} />
                ))}
              </div>
              
              <div className="load-more">
                <button className="load-more-btn">Charger plus d'annonces</button>
              </div>
            </div>
            
            <aside className="sidebar">
              <div className="sidebar-section">
                <h3>Utilisateurs actifs</h3>
                <div className="active-users">
                  <div className="user-item">
                    <div className="user-avatar">M</div>
                    <span>Marie L.</span>
                    <span className="status online">En ligne</span>
                  </div>
                  <div className="user-item">
                    <div className="user-avatar">J</div>
                    <span>Jean D.</span>
                    <span className="status online">En ligne</span>
                  </div>
                  <div className="user-item">
                    <div className="user-avatar">S</div>
                    <span>Sophie M.</span>
                    <span className="status away">Absent</span>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3>Annonces populaires</h3>
                <div className="trending-ads">
                  <div className="trending-item">
                    <div className="trending-title">Villa avec piscine</div>
                    <div className="trending-stats">🔥 156 vues</div>
                  </div>
                  <div className="trending-item">
                    <div className="trending-title">iPhone 14 Pro Max</div>
                    <div className="trending-stats">❤️ 89 j'aime</div>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3>Jeu du jour</h3>
                <div className="maze-game-card">
                  <h4>Défi Labyrinthe</h4>
                  <p>Résolvez le labyrinthe du jour et gagnez des points !</p>
                  <button className="play-maze-btn">Jouer maintenant</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        .main-content {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          padding: 32px 0;
        }
        
        .feed-section {
          min-height: 100vh;
        }
        
        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .feed-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--gray-800);
        }
        
        .feed-filters {
          display: flex;
          gap: 8px;
        }
        
        .filter-btn {
          padding: 8px 16px;
          border: 1px solid var(--gray-300);
          border-radius: 20px;
          background: white;
          color: var(--gray-600);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }
        
        .filter-btn:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }
        
        .filter-btn.active {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }
        
        .ads-feed {
          margin-bottom: 32px;
        }
        
        .load-more {
          text-align: center;
        }
        
        .load-more-btn {
          padding: 12px 24px;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        
        .load-more-btn:hover {
          background: #1e40af;
        }
        
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .sidebar-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid var(--gray-200);
        }
        
        .sidebar-section h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--gray-800);
        }
        
        .active-users {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .user-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }
        
        .status {
          margin-left: auto;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .status.online {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .status.away {
          background: #fef3c7;
          color: #d97706;
        }
        
        .trending-ads {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .trending-item {
          padding: 12px;
          background: var(--gray-100);
          border-radius: 8px;
        }
        
        .trending-title {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .trending-stats {
          font-size: 12px;
          color: var(--gray-600);
        }
        
        .maze-game-card {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, var(--primary-blue), #1e40af);
          color: white;
          border-radius: 8px;
        }
        
        .maze-game-card h4 {
          margin-bottom: 8px;
        }
        
        .maze-game-card p {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 16px;
        }
        
        .play-maze-btn {
          padding: 8px 16px;
          background: var(--primary-yellow);
          color: var(--gray-800);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease;
        }
        
        .play-maze-btn:hover {
          transform: translateY(-1px);
        }
        
        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            order: -1;
          }
        }
        
        @media (max-width: 768px) {
          .feed-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .feed-filters {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}