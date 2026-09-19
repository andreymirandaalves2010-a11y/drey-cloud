"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      try {
        const response = await fetch(
          `${apiUrl}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Não foi possível carregar sua conta."
          );
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error(err);

        setError(
          "Não foi possível conectar ao servidor."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // LOADING
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
        }}>
          <div style={{ fontSize: '48px' }}>⏳</div>
          <p>Carregando seu perfil...</p>
        </div>
      </main>
    );
  }

  // ERRO
  if (error) {
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
          <div style={{ fontSize: '64px' }}>🔒</div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            Sessão não encontrada
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            {error}
          </p>
          <Link
            href="/"
            className="drey-btn drey-btn-primary"
            style={{ marginTop: '30px' }}
          >
            ← Tela inicial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="drey-page">
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
            <Link href="/" className="drey-btn drey-btn-outline">
              Sair
            </Link>
          </div>
        </div>
      </header>

      <section style={{ padding: '60px 20px' }}>
        <div className="drey-container">

          {/* HEADER */}
          <div style={{
            marginBottom: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '30px',
          }}>
            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}>
                Olá, {user.name} 👋
              </h1>
              <p style={{ color: 'var(--muted)' }}>
                Bem-vindo ao seu Drey Cloud.
              </p>
            </div>

            <Link
              href="/"
              className="drey-btn drey-btn-outline"
            >
              ← Tela inicial
            </Link>
          </div>

          {/* INFORMAÇÕES DA CONTA */}
          <div style={{
            marginBottom: '50px',
            padding: '30px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}>
              Informações da Conta
            </h3>
            <div style={{
              display: 'grid',
              gap: '15px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '5px' }}>
                  EMAIL
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {user.email}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '5px' }}>
                  ID
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'monospace' }}>
                  {user.id}
                </p>
              </div>
            </div>
          </div>

          {/* ESTATÍSTICAS */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '30px',
            }}>
              Estatísticas
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}>
              {/* HORAS */}
              <div className="drey-stat-card">
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>
                  ⏱️
                </div>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Horas Jogadas
                </p>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--cyan)',
                }}>
                  {user.hours_played || 0}h
                </h2>
              </div>

              {/* JOGOS */}
              <div className="drey-stat-card">
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>
                  🎮
                </div>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Jogos Jogados
                </p>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--cyan)',
                }}>
                  {user.games_played || 0}
                </h2>
              </div>

              {/* CONQUISTAS */}
              <div className="drey-stat-card">
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>
                  🏆
                </div>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Conquistas
                </p>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--cyan)',
                }}>
                  {user.achievements || 0}
                </h2>
              </div>

              {/* RATING */}
              <div className="drey-stat-card">
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>
                  ⭐
                </div>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Rating
                </p>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--cyan)',
                }}>
                  {Number(user.rating || 0).toFixed(1)}
                </h2>
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
