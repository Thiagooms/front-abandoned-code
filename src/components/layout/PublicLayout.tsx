import type { ReactNode } from 'react';
import { PublicSidebar } from './PublicSidebar';
import './Layout.css';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="layout public-layout">
      <PublicSidebar />
      <div className="layout-container">
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}
