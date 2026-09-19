'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/games', label: 'Jogos' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="drey-navbar">
      <div className="drey-container drey-nav-content">
        {/* Logo */}
        <Link href="/" className="drey-logo">
          DREY<span>CLOUD</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="drey-nav-links" style={{ display: isOpen ? 'flex' : undefined }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="drey-nav-link"
              style={{
                color: pathname === link.href ? 'var(--cyan)' : 'var(--text)',
                borderBottom: pathname === link.href ? '2px solid var(--cyan)' : 'none',
                paddingBottom: pathname === link.href ? '5px' : '0',
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Links */}
        <div className="drey-nav-actions">
          <Link
            href="/login"
            className="drey-btn drey-btn-outline"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            className="drey-btn drey-btn-primary"
          >
            Cadastro
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="drey-mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
