'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/games', label: 'Jogos', icon: '🎮' },
    { href: '/admin/machines', label: 'Máquinas', icon: '🖥️' },
    { href: '/admin/users', label: 'Usuários', icon: '👥' },
    { href: '/admin/sessions', label: 'Sessões', icon: '▶️' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-dark text-white transition-all duration-300 min-h-screen`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {isOpen && <span className="font-bold text-lg">Admin</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-700 rounded transition"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded transition ${
              pathname === item.href
                ? 'bg-primary text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded hover:bg-gray-700 transition text-gray-300"
        >
          <span className="text-xl">🏠</span>
          {isOpen && <span>Voltar</span>}
        </Link>
      </div>
    </div>
  );
}
