import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
