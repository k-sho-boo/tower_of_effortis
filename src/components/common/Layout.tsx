import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

const Layout = ({ children, showBackButton = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-game-bg">
      <header className="bg-game-card border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-game-primary hover:text-game-secondary transition-colors">
              Tower of Effortis
            </Link>
            {showBackButton && (
              <Link to="/" className="game-button-secondary !px-4 !py-2 text-sm">
                戻る
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
