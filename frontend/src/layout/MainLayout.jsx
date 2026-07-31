import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileSidebar } from './MobileSidebar';
import { Footer } from './Footer';

export const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[700px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute top-[40%] right-[-15%] w-[50vw] h-[50vw] max-w-[650px] rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
