import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="drey-footer">
      <div className="drey-container drey-footer-content">
        {/* Brand */}
        <div className="drey-footer-brand">
          <h3 className="drey-logo" style={{ marginBottom: '15px', fontSize: '20px' }}>
            DREY<span>CLOUD</span>
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
            A plataforma de jogos em nuvem mais rápida e confiável do Brasil.
            Jogue seus jogos favoritos de qualquer lugar.
          </p>
        </div>

        {/* Produto */}
        <div>
          <h5 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: 'var(--white)',
          }}>
            Produto
          </h5>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <Link href="/games" className="drey-footer-link">
                Jogos
              </Link>
            </li>
            <li>
              <Link href="/" className="drey-footer-link">
                Planos
              </Link>
            </li>
            <li>
              <a href="#" className="drey-footer-link">
                Recursos
              </a>
            </li>
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h5 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: 'var(--white)',
          }}>
            Empresa
          </h5>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <a href="#" className="drey-footer-link">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="drey-footer-link">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="drey-footer-link">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: 'var(--white)',
          }}>
            Legal
          </h5>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <a href="#" className="drey-footer-link">
                Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="drey-footer-link">
                Termos
              </a>
            </li>
            <li>
              <a href="#" className="drey-footer-link">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="drey-container drey-footer-bottom">
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
          © {currentYear} Drey Cloud. Todos os direitos reservados.
        </p>
        <div style={{
          display: 'flex',
          gap: '24px',
          marginTop: '15px',
        }}>
          <a href="#" className="drey-footer-link">
            Twitter
          </a>
          <a href="#" className="drey-footer-link">
            Discord
          </a>
          <a href="#" className="drey-footer-link">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
