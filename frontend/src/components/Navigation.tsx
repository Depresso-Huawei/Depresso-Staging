import React from 'react';
import { Home, BookOpen, Activity, Users, Heart, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'wellness', label: 'Wellness', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'care', label: 'Care Connect', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white px-4 py-2" style={{ borderTop: '1px solid var(--light-gray)' }}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center p-2 rounded-lg transition-all duration-200"
              style={{
                color: isActive ? 'var(--sky-blue)' : 'var(--slate-blue)',
                backgroundColor: isActive ? 'rgba(168, 207, 229, 0.15)' : 'transparent',
              }}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;