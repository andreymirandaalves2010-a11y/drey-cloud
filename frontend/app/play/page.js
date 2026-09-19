'use client';

import { useState, useEffect } from 'react';
import GamepadHUD from '@/components/GamepadHUD';
import GamepadHUDMobile from '@/components/GamepadHUDMobile';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PlayPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      const isMobileDevice = isAndroid || isIOS || window.innerWidth < 768;
      
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simular jogo em execução (remover quando integrar com backend real)
  useEffect(() => {
    setGameRunning(true);
  }, []);

  if (gameRunning) {
    return (
      <main style={{
        width: '100%',
        height: '100vh',
        background: 'radial-gradient(circle, rgba(0,0,0,0.95), rgba(0,0,0,1))',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9998,
      }}>
        {/* Área de Jogo */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 0, 0, 0.9))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: isMobile ? '32px' : '48px',
          }}>
            <div style={{ fontSize: isMobile ? '80px' : '120px', marginBottom: '20px' }}>🎮</div>
            <h1>{isMobile ? 'Toque na tela' : 'Controle conectado'}</h1>
            <p style={{ opacity: 0.7, fontSize: isMobile ? '14px' : '18px', marginTop: '10px' }}>
              {isMobile 
                ? 'Use os botões touch para jogar'
                : 'Use o Xbox para controlar'
              }
            </p>
          </div>
        </div>

        {/* HUD Apropriado */}
        {isMobile ? <GamepadHUDMobile /> : <GamepadHUD />}
      </main>
    );
  }

  return (
    <main className="drey-page" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.9), rgba(0,0,0,1))' }}>
      {/* NAVBAR */}
      <Navbar />

      {/* GAMEPAD HUD (Desktop Only) */}
      {!isMobile && <GamepadHUD />}

      {/* CONTEÚDO PRINCIPAL */}
      <section style={{ padding: '100px 20px' }}>
        <div className="drey-container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '96px', marginBottom: '20px' }}>🎮</div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px' }}>
              Página de Controle
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '30px' }}>
              {isMobile 
                ? 'Toque na tela para controlar o jogo'
                : 'Conecte um controle Xbox para visualizar o HUD de entrada'
              }
            </p>
            
            <div style={{
              maxWidth: '600px',
              margin: '40px auto',
              padding: '30px',
              background: 'rgba(0, 212, 255, 0.05)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '12px',
            }}>
              <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Como usar:</h2>
              <ul style={{ textAlign: 'left', fontSize: '16px', lineHeight: '1.8' }}>
                {isMobile ? (
                  <>
                    <li>✓ Toque nos botões na tela para controlar</li>
                    <li>✓ D-PAD fica no canto inferior esquerdo</li>
                    <li>✓ Botões ABXY ficam no canto inferior direito</li>
                    <li>✓ Toque duplo no centro para ocultar/mostrar HUD</li>
                    <li>✓ HUD é responsivo para telas pequenas</li>
                  </>
                ) : (
                  <>
                    <li>✓ Conecte um controle Xbox compatível ao seu PC</li>
                    <li>✓ O HUD aparecerá automaticamente no canto inferior direito</li>
                    <li>✓ Todos os botões, triggers e analógicos serão exibidos em tempo real</li>
                    <li>✓ Pressione BACK + START para ocultar/mostrar o HUD</li>
                    <li>✓ O HUD é útil para debug e visualização de entrada</li>
                  </>
                )}
              </ul>
            </div>

            <div style={{ marginTop: '40px', opacity: 0.6 }}>
              <p>
                Tipo de dispositivo: 
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                  {isMobile ? ' Móvel/Touch' : ' Desktop/Xbox'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
