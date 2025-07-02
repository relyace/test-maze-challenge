'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function MazePage() {
  const [playerName, setPlayerName] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameLog, setGameLog] = useState<string[]>([])

  const startMazeGame = async () => {
    if (!playerName.trim()) {
      alert('Veuillez entrer un nom de joueur')
      return
    }

    setIsPlaying(true)
    setGameLog(['🎮 Démarrage du jeu labyrinthe...'])
    
    // Simulate maze game interaction
    try {
      setGameLog(prev => [...prev, `🏃 Joueur "${playerName}" créé`])
      
      // Simulate some maze exploration
      const moves = [
        '🔍 Exploration des environs...',
        '➡️ Déplacement vers l\'est',
        '⬆️ Déplacement vers le nord', 
        '❌ Mur détecté, retour en arrière',
        '⬇️ Déplacement vers le sud',
        '🏆 Sortie trouvée ! Félicitations !',
      ]
      
      for (let i = 0; i < moves.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setGameLog(prev => [...prev, moves[i]])
      }
      
      setGameLog(prev => [...prev, '✅ Partie terminée avec succès !'])
      
    } catch (error) {
      setGameLog(prev => [...prev, `❌ Erreur: ${error}`])
    } finally {
      setIsPlaying(false)
    }
  }

  return (
    <div className="maze-page">
      <header className="maze-header">
        <div className="container">
          <Link href="/" className="back-link">
            ← Retour au feed social
          </Link>
          <h1>🎮 Défi Labyrinthe E-Tady</h1>
          <p>Testez vos compétences de navigation dans notre labyrinthe intelligent !</p>
        </div>
      </header>

      <main className="container">
        <div className="maze-content">
          <div className="game-section">
            <div className="game-card">
              <h2>Nouvelle Partie</h2>
              <div className="player-input">
                <label htmlFor="playerName">Nom du joueur:</label>
                <input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Entrez votre nom"
                  disabled={isPlaying}
                />
              </div>
              
              <button 
                onClick={startMazeGame}
                disabled={isPlaying || !playerName.trim()}
                className="start-button"
              >
                {isPlaying ? '🔄 Partie en cours...' : '🚀 Commencer le labyrinthe'}
              </button>
            </div>

            <div className="game-log">
              <h3>Journal de partie</h3>
              <div className="log-content">
                {gameLog.length === 0 ? (
                  <p className="no-log">Aucune partie en cours</p>
                ) : (
                  gameLog.map((entry, index) => (
                    <div key={index} className="log-entry">
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>🎯 Comment jouer</h3>
              <ul>
                <li>Entrez votre nom et cliquez sur "Commencer"</li>
                <li>Le jeu explore automatiquement le labyrinthe</li>
                <li>Suivez les mouvements dans le journal</li>
                <li>Trouvez la sortie pour gagner !</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🏆 Fonctionnalités</h3>
              <ul>
                <li>Intelligence artificielle pour résoudre le labyrinthe</li>
                <li>Système de backtracking intelligent</li>
                <li>Évite les pièges et obstacles</li>
                <li>Trouve automatiquement le chemin optimal</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>📊 Statistiques</h3>
              <div className="stats">
                <div className="stat">
                  <span className="stat-number">1,247</span>
                  <span className="stat-label">Parties jouées</span>
                </div>
                <div className="stat">
                  <span className="stat-number">89%</span>
                  <span className="stat-label">Taux de réussite</span>
                </div>
                <div className="stat">
                  <span className="stat-number">2.4</span>
                  <span className="stat-label">Temps moyen (min)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .maze-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .maze-header {
          padding: 40px 0;
          text-align: center;
          background: rgba(0, 0, 0, 0.1);
        }

        .back-link {
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .maze-header h1 {
          font-size: 36px;
          margin-bottom: 16px;
        }

        .maze-header p {
          font-size: 18px;
          opacity: 0.9;
        }

        .maze-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 32px;
          padding: 40px 0;
        }

        .game-card, .info-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 24px;
        }

        .game-card h2, .info-card h3 {
          margin-bottom: 20px;
          font-size: 24px;
        }

        .player-input {
          margin-bottom: 20px;
        }

        .player-input label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .player-input input {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          font-size: 16px;
        }

        .start-button {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          background: #fbbf24;
          color: #1f2937;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .start-button:hover:not(:disabled) {
          background: #f59e0b;
          transform: translateY(-2px);
        }

        .start-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .game-log {
          margin-top: 32px;
        }

        .game-log h3 {
          margin-bottom: 16px;
          font-size: 20px;
        }

        .log-content {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 16px;
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
        }

        .log-entry {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: monospace;
          animation: fadeIn 0.3s ease;
        }

        .log-entry:last-child {
          border-bottom: none;
        }

        .no-log {
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
          text-align: center;
          padding: 40px 0;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
        }

        .info-card li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .info-card li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        .stat {
          text-align: center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #fbbf24;
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.8;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .maze-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .maze-header {
            padding: 20px 0;
          }

          .maze-header h1 {
            font-size: 28px;
          }

          .stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}