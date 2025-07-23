// components/ProfileSidebar.tsx
import React from 'react';
import { User, MapPin, Package } from 'lucide-react';

interface SidebarProps {
  activePage: 'profile' | 'address' | 'orders';
  setActivePage: React.Dispatch<React.SetStateAction<'profile' | 'address' | 'orders'>>;
}

const menuItems = [
  { key: 'profile' as const, label: 'My Account', icon: <User className="mx-2" /> },
  { key: 'address' as const, label: 'My Addresses', icon: <MapPin className="mx-2" /> },
  { key: 'orders' as const, label: 'My Orders', icon: <Package className="mx-2" /> },
];

const ProfileSidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => (
  <nav className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full md:w-64">
    <ul className="flex md:flex-col justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
      {menuItems.map(({ key, label, icon }) => (
        <li
          key={key}
          onClick={() => setActivePage(key)}
          className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition-colors ${
            activePage === key ? 'bg-[#e80808] hover:bg-[#ec5a5a] font-semibold text-white' : 'bg-indigo-100 font-semibold hover:bg-indigo-50 '
          }`}
        >
          {icon}
          <span className="text-sm md:text-base hidden sm:block">{label}</span>
        </li>
      ))}
    </ul>
  </nav>
);

export default ProfileSidebar;