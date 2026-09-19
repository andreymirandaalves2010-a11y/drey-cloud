'use client';

import { useEffect, useState } from 'react';
import { mockGames } from '@/data/mock';
import Link from 'next/link';
import LaunchButton from '@/components/LaunchButton';

export default function GameDetail({ params }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primeiro tenta buscar da API, depois do mockGames
    const fetchGame = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/games`);
        
        if (response.ok) {
          const games = await response.json();
          const foundGame = games.find(g => g.slug === params.slug);
          if (foundGame) {
            setGame(foundGame);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log('📦 Erro ao buscar jogos da API, usando mockGames...');
      }

      // Fallback para mockGames
      const mockGame = mockGames.find(g => g.slug === params.slug);
      setGame(mockGame || null);
      setLoading(false);
    };

    fetchGame();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="drey-page">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', animation: 'spin 1s linear infinite' }}>⏳</div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Carregando jogo...
          </h1>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main className="drey-page">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '64px' }}>🎮</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Jogo não encontrado
          </h1>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
            Este jogo não existe em nossa biblioteca.
          </p>
          <Link href="/games" className="drey-btn drey-btn-primary">
            Voltar para Jogos →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="drey-page">
      {/* NAVBAR */}
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">
            DREY<span>CLOUD</span>
          </Link>

          <nav className="drey-nav-links">
            <a href="/games">Jogos</a>
            <a href="/dashboard">Dashboard</a>
          </nav>

          <div className="drey-nav-actions">
            <Link href="/games" className="drey-btn drey-btn-outline">
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* BANNER */}
      <div style={{
        height: '350px',
        background: `linear-gradient(135deg, var(--cyan), var(--cyan-dark))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ fontSize: '120px', opacity: 0.15, position: 'absolute' }}>
          {game?.title?.[0] || '🎮'}
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '15px',
          }}>
            {game?.title || 'Jogo'}
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
          }}>
            {game?.genre || 'Jogo'}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section style={{ padding: '60px 20px' }}>
        <div className="drey-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '40px',
          }}>
            {/* Main Content */}
            <div>
              {/* Rating */}
              <div style={{
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '20px',
                        color: i < Math.floor(game?.rating || 0) ? 'var(--cyan)' : 'var(--border)',
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--cyan)',
                }}>
                  {game?.rating || 0}
                </span>
                <span style={{ color: 'var(--muted)' }}>
                  / 5 (1,234 avaliações)
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                }}>
                  Sobre o Jogo
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: 'var(--text)',
                }}>
                  {game?.description || 'Descrição não disponível'}
                </p>
              </div>

              {/* Specs */}
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}>
                  Especificações
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  padding: '30px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase' }}>
                      Desenvolvedor
                    </p>
                    <p style={{ fontWeight: 'bold' }}>CD Projekt Red</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase' }}>
                      Publisher
                    </p>
                    <p style={{ fontWeight: 'bold' }}>CD Projekt Red</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase' }}>
                      Gênero
                    </p>
                    <p style={{ fontWeight: 'bold' }}>{game?.genre || 'Não especificado'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase' }}>
                      Lançamento
                    </p>
                    <p style={{ fontWeight: 'bold' }}>2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Status */}
              <div style={{
                padding: '25px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
              }}>
                <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Status
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {(game?.status || 'available') === 'available' && (
                    <>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}></span>
                      <span style={{ fontWeight: 'bold' }}>Disponível</span>
                    </>
                  )}
                  {(game?.status || 'available') === 'maintenance' && (
                    <>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#eab308',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}></span>
                      <span style={{ fontWeight: 'bold' }}>Em Manutenção</span>
                    </>
                  )}
                </div>
              </div>

              {/* Launch Button */}
              <LaunchButton game={game} />

              {/* Play Button */}
              <button
                disabled={(game?.status || 'available') !== 'available'}
                className="drey-btn drey-btn-primary drey-btn-large"
                style={{
                  width: '100%',
                  opacity: (game?.status || 'available') !== 'available' ? 0.5 : 1,
                  cursor: (game?.status || 'available') !== 'available' ? 'not-allowed' : 'pointer',
                }}
              >
                ▶ Jogar Agora
              </button>

              {/* Add to Library */}
              <button className="drey-btn drey-btn-outline drey-btn-large" style={{ width: '100%' }}>
                ❤ Adicionar à Biblioteca
              </button>

              {/* Share */}
              <div style={{
                paddingTop: '25px',
                borderTop: '1px solid var(--border)',
                marginTop: '15px',
              }}>
                <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '15px', textTransform: 'uppercase' }}>
                  Compartilhar
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '10px',
                }}>
                  <button className="drey-btn drey-btn-outline" style={{ width: '100%', padding: '10px' }}>
                    X
                  </button>
                  <button className="drey-btn drey-btn-outline" style={{ width: '100%', padding: '10px' }}>
                    FB
                  </button>
                  <button className="drey-btn drey-btn-outline" style={{ width: '100%', padding: '10px' }}>
                    DC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="drey-footer">
        <div className="drey-container drey-footer-bottom">
          <p>© 2026 Drey Cloud. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
