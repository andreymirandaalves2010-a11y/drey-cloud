'use client';

import { useState } from 'react';

export default function LaunchButton({ game }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchMessage, setLaunchMessage] = useState('');
  const [launchError, setLaunchError] = useState('');

  const handleLaunchGame = async () => {
    // Aceita slug, gameId ou name como identificador
    const gameId = game?.slug || game?.gameId || game?.name;
    
    if (!game || !gameId) {
      console.error('Game ou gameId invalido:', game);
      setLaunchError('Jogo invalido. Faltam dados necessarios.');
      setTimeout(() => setLaunchError(''), 3000);
      return;
    }

    setIsLaunching(true);
    setLaunchMessage('');
    setLaunchError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const normalizedId = gameId.toLowerCase().replace(/\s+/g, '-');
      console.log(`Tentando iniciar: ${normalizedId} via ${apiUrl}`);
      
      const response = await fetch(`${apiUrl}/api/games/launch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: normalizedId }),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (data.success) {
        console.log('Jogo iniciado com sucesso!');
        setLaunchMessage(data.message);
        setTimeout(() => setLaunchMessage(''), 5000);
      } else {
        console.error('Erro ao iniciar:', data.message);
        setLaunchError(data.message || 'Erro ao iniciar o aplicativo');
        setTimeout(() => setLaunchError(''), 5000);
      }
    } catch (error) {
      console.error('Launch error:', error);
      setLaunchError(`Erro ao conectar: ${error.message}`);
      setTimeout(() => setLaunchError(''), 5000);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <>
      {launchMessage && (
        <div style={{
          marginBottom: '15px',
          padding: '15px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid #10b981',
          borderRadius: '8px',
          color: '#10b981',
          fontWeight: 'bold',
        }}>
          Mensagem: {launchMessage}
        </div>
      )}
      {launchError && (
        <div style={{
          marginBottom: '15px',
          padding: '15px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          color: '#ef4444',
          fontWeight: 'bold',
        }}>
          Erro: {launchError}
        </div>
      )}

      <button
        onClick={handleLaunchGame}
        disabled={(game?.status || 'available') !== 'available' || isLaunching}
        className="drey-btn drey-btn-primary drey-btn-large"
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          fontWeight: 'bold',
          opacity: (game?.status || 'available') !== 'available' || isLaunching ? 0.6 : 1,
          cursor: (game?.status || 'available') !== 'available' || isLaunching ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {isLaunching ? 'Iniciando jogo...' : 'Clique para Jogar'}
      </button>
    </>
  );
}