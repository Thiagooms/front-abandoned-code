import { ReactNode } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicSidebar } from './PublicSidebar';
import './Layout.css';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="layout">
      <PublicHeader />
      <div className="layout-container">
        <PublicSidebar />
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}
