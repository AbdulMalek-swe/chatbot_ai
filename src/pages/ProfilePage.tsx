import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfilePersonalTab from '../components/profile/ProfilePersonalTab';
import ProfileAdsTab from '../components/profile/ProfileAdsTab';
import BackgroundEffects from '../components/profile/BackgroundEffects';

/* ─────────────────────────────────────────────
   Tiny CSS-in-JS keyframe injector
   Note: Some animations from index.css are reused, 
   others are specific to this premium profile design.
───────────────────────────────────────────── */
const ProfilePage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'ads'>('profile');

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFDFB]">
        <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin shadow-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFDFB] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <BackgroundEffects />
      <ProfileHeader user={user} />

      <main className="flex-1 relative z-10 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="w-full lg:w-72 sticky top-32">
                <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="flex-1 w-full max-w-4xl">
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                {activeTab === 'profile' ? <ProfilePersonalTab /> : <ProfileAdsTab />}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle footer or decoration if needed */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default ProfilePage;
