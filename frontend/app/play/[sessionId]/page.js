'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PlaySession({ params }) {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Simulate connection to gaming server
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
      setSessionData({
        sessionId: params.sessionId,
        gameName: 'Elden Ring',
        startTime: new Date().toLocaleTimeString('pt-BR'),
        server: 'Server 1 - São Paulo',
        bandwidth: '25 Mbps',
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [params.sessionId]);

  if (connectionStatus === 'connecting') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-4">Conectando...</h2>
          <p className="text-gray-400">Inicializando sessão de jogo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Gaming Area */}
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold mb-2">
            {sessionData?.gameName}
          </h1>
          <p className="text-gray-400 mb-8">
            Jogo está sendo transmitido para este dispositivo
          </p>

          {/* Info Panel */}
          <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6 w-96 mx-auto mb-8">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-gray-400 text-sm">SERVIDOR</p>
                <p className="text-lg font-semibold">{sessionData?.server}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">BANDA</p>
                <p className="text-lg font-semibold">{sessionData?.bandwidth}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">ID SESSÃO</p>
                <p className="text-sm font-mono">{sessionData?.sessionId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">DURAÇÃO</p>
                <p className="text-lg font-semibold">00:45:23</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
              📵 Mudo
            </button>
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
              ⚙️ Configurações
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-bold"
            >
              ❌ Sair
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay Info */}
      <div className="fixed top-4 right-4 bg-gray-900 bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Conectado • 60 FPS</span>
        </div>
      </div>
    </div>
  );
}
