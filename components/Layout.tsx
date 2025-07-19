"use client"
// import React, { useState } from 'react';
import Sidebar from './Sidebar';

import React, { ReactNode, Dispatch, SetStateAction, useState, useEffect} from 'react';

export interface LayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="flex flex-col md:flex-row">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;