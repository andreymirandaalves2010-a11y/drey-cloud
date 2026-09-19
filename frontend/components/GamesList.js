'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function GamesList({ games, isLoading = false }) {
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const genres = useMemo(() => {
    const uniqueGenres = new Set(games.map(g => g.genre));
    return ['Todos', ...Array.from(uniqueGenres).sort()];
  }, [games]);

  const filteredGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchesGenre = selectedGenre === 'Todos' || game.genre === selectedGenre;
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGenre && matchesSearch;
    });

    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'status') {
      filtered.sort((a, b) => a.status === 'available' ? -1 : 1);
    }
    return filtered;
  }, [games, selectedGenre, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <p style={{ fontSize: '18px', color: 'var(--muted)' }}>Carregando biblioteca de jogos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* FILTROS E BUSCA */}
      <div style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <input 
          type="text" 
          placeholder="Buscar jogos..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="drey-input" 
          style={{ fontSize: '16px', padding: '14px 20px' }} 
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="drey-input" 
          style={{ fontSize: '16px', padding: '14px 20px', background: 'var(--background-secondary)', color: 'var(--text)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer' }}
        >
          <option value="rating">Classificação</option>
          <option value="title">A-Z</option>
          <option value="status">Disponibilidade</option>
        </select>
      </div>

      {/* FILTROS DE GÊNERO */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '50px', overflowX: 'auto', paddingBottom: '10px', flexWrap: 'wrap' }}>
        {genres.map(genre => {
          const count = genre === 'Todos' ? games.length : games.filter(g => g.genre === genre).length;
          return (
            <button 
              key={genre} 
              onClick={() => setSelectedGenre(genre)} 
              className={selectedGenre === genre ? 'drey-btn drey-btn-primary' : 'drey-btn drey-btn-outline'} 
              style={{ whiteSpace: 'nowrap', padding: '10px 24px' }}
            >
              {genre} <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.7 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* GRID DE JOGOS */}
      {filteredGames.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {filteredGames.map(game => (
            <Link 
              key={game.id} 
              href={`/games/${game.slug}`} 
              className="drey-game-card" 
              style={{ position: 'relative', opacity: game.status === 'maintenance' ? 0.7 : 1 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {game.status === 'maintenance' && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#fbbf24', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', zIndex: 10 }}>
                    MANUTENÇÃO
                  </div>
                )}
                <div style={{ width: '100%', aspectRatio: '16/9', background: `linear-gradient(135deg, var(--cyan), var(--cyan-dark))`, borderRadius: 'calc(var(--radius) - 8px)', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'rgba(255,255,255,0.1)' }}>
                  {game.title.charAt(0)}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {game.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '15px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {game.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid var(--border)', fontSize: '13px' }}>
                  <span style={{ color: 'var(--muted)' }}>{game.genre}</span>
                  <span style={{ color: game.status === 'maintenance' ? '#fbbf24' : 'var(--cyan)' }}>★ {game.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '16px', color: 'var(--muted)' }}>Nenhum jogo encontrado</p>
        </div>
      )}
    </div>
  );
}
