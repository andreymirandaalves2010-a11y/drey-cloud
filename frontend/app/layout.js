import '../styles/globals.css';

export const metadata = {
  title: 'Drey Cloud - Cloud Gaming Platform',
  description: 'Jogue seus jogos favoritos em qualquer lugar, em qualquer dispositivo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
