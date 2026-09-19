"use client";
import Link from "next/link";
export default function Home() {
  return (
    <main className="drey-page">
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">
            DREY<span>CLOUD</span>
          </Link>
          <nav className="drey-nav-links">
            <a href="#inicio">Início</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#recursos">Recursos</a>
          </nav>
          <div className="drey-nav-actions">
            <Link href="/login" className="drey-btn drey-btn-outline">
              Entrar
            </Link>
            <Link href="/cadastro" className="drey-btn drey-btn-primary">
              Criar conta
            </Link>
          </div>
        </div>
      </header>
      <section id="inicio" className="drey-hero">
        <div className="drey-hero-glow"></div>
        <div className="drey-container drey-hero-grid">
          <div style={{ position: "absolute", top: "120px", right: "20px" }}>
            <Link href="/play" className="drey-btn drey-btn-outline">
              🎮 HUD
            </Link>
          </div>
          <div className="drey-hero-content">
            <div className="drey-badge">
              <span className="drey-status-dot"></span>🎮 CLOUD GAMING
            </div>
            <h1>
              Seus jogos.
              <br />
              <span>Na nuvem.</span>
            </h1>
            <p>Transforme qualquer dispositivo em uma experiência de gaming.</p>
            <div className="drey-hero-buttons">
              <Link
                href="/login"
                className="drey-btn drey-btn-primary drey-btn-large"
              >
                Começar agora →
              </Link>
              <a
                href="#como-funciona"
                className="drey-btn drey-btn-outline drey-btn-large"
              >
                Como funciona
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="drey-footer">
        <div className="drey-container drey-footer-bottom">
          <p>© 2026 Drey Cloud</p>
        </div>
      </footer>
    </main>
  );
}
