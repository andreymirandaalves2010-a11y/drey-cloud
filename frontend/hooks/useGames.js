'use client';

import { useState, useEffect } from 'react';
import { mockGames } from '@/data/mock';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/games`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao carregar jogos: ${response.status}`);
        }

        const data = await response.json();
        
        // Se a API retornar um array válido, use os dados
        if (Array.isArray(data) && data.length > 0) {
          const gamesWithDefaults = data.map(game => ({
            id: game.id,
            title: game.name || game.title || 'Sem título',
            slug: game.slug || `game-${game.id}`,
            description: game.description || 'Sem descrição',
            genre: game.genre || 'Outros',
            status: game.status || 'available',
            rating: game.rating || 4.5,
            gameId: game.slug || `game-${game.id}`,
            image: game.cover || '/images/default.jpg',
          }));
          setGames(gamesWithDefaults);
        } else {
          // Se a API não retorna dados válidos, use os dados mockados
          console.log('📦 Nenhum jogo encontrado na API, usando dados mockados...');
          setGames(mockGames);
        }
        setError('');
      } catch (err) {
        console.warn('⚠️ Erro ao carregar da API, usando dados mockados:', err.message);
        setGames(mockGames);
        setError('');
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return { games, loading, error };
};
