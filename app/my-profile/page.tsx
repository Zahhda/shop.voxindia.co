// pages/MyProfile.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileForm from '@/components/ProfileForm';
import DeliveryAddress from '@/components/DeliveryAddress';
import MyOrders from '@/components/MyOrders';
import WelcomeHeader from '@/components/WelcomeHeader';

const MyProfile: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [activePage, setActivePage] = useState<'profile' | 'address' | 'orders'>('profile');

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) {
      router.push('/login');
      return;
    }
    try {
      const user = JSON.parse(saved) as { email?: string; name?: string };
      if (!user.email) {
        // router.push('/login');
        return;
      }
      if (user.name) setUserName(user.name);
    } catch {
      router.push('/login');
    }
  }, [router]);

  const renderContent = (): React.ReactNode => {
    switch (activePage) {
      case 'address':
        return <DeliveryAddress />;
      case 'orders':
        return <MyOrders />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* <aside className="p-4 md:p-8">
        <ProfileSidebar activePage={activePage} setActivePage={setActivePage} />
      </aside> */}
      <aside className="md:static fixed bottom-0 left-0 right-0 z-10 bg-white md:bg-transparent md:p-8 shadow-inner md:shadow-none">
  <ProfileSidebar activePage={activePage} setActivePage={setActivePage} />
</aside>

      <main className="flex-1 p-4 md:p-8">
        <WelcomeHeader name={userName || 'User'} />
        <div className="mt-6 bg-white p-4 md:p-6 rounded-lg shadow-md animate-fadeIn">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MyProfile;