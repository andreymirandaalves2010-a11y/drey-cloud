'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao fazer login');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="drey-page">
      {/* NAVBAR */}
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">
            DREY<span>CLOUD</span>
          </Link>

          <nav className="drey-nav-links">
            <a href="/">Início</a>
            <a href="/#como-funciona">Como funciona</a>
            <a href="/#recursos">Recursos</a>
          </nav>

          <div className="drey-nav-actions">
            <Link href="/cadastro" className="drey-btn drey-btn-primary">
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      {/* HERO - AUTH FORM */}
      <section className="drey-hero">
        <div className="drey-hero-glow"></div>

        <div className="drey-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
          {/* Form Container */}
          <div className="drey-auth-form">
            {/* Header */}
            <div className="drey-auth-header">
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                🎮
              </div>
              <h1>Fazer Login</h1>
              <p>Entre em sua conta Drey Cloud</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="drey-alert drey-alert-error">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="drey-auth-form-content">
              {/* Email */}
              <div className="drey-form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="drey-input"
                />
              </div>

              {/* Password */}
              <div className="drey-form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="drey-input"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="drey-btn drey-btn-primary drey-btn-large"
                style={{ width: '100%', marginTop: '10px' }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Divider */}
            <div className="drey-divider">ou</div>

            {/* Links */}
            <div className="drey-auth-links">
              <Link href="/cadastro" className="drey-link-primary">
                Não tem conta? Cadastre-se
              </Link>
              <a href="#" className="drey-link-secondary">
                Esqueceu a senha?
              </a>
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
