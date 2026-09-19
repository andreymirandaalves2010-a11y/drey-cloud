'use client';

import Link from 'next/link';
import { useGames } from '@/hooks/useGames';
import GamesList from '@/components/GamesList';

export default function Games() {
  const { games, loading } = useGames();

  return (
    <main className="drey-page">
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">
            DREY<span>CLOUD</span>
          </Link>
          <nav className="drey-nav-links">
            <a href="/games" style={{ color: 'var(--cyan)', fontWeight: 'bold' }}>Jogos</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
          <div className="drey-nav-actions">
            <Link href="/" className="drey-btn drey-btn-primary">
              Inicio
            </Link>
          </div>
        </div>
      </header>

      <section style={{ padding: '60px 20px' }}>
        <div className="drey-container">
          <div style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '15px' }}>Biblioteca de Jogos</h1>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '600px' }}>Explore nossa colecao de jogos premium em streaming</p>
          </div>

          <GamesList games={games} isLoading={loading} />
        </div>
      </section>

      <footer className="drey-footer">
        <div className="drey-container drey-footer-bottom">
          <p>© 2026 Drey Cloud. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
