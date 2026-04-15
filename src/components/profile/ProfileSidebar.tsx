import { User, Globe, ChevronRight, Zap, ShieldCheck, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';

interface ProfileSidebarProps {
    activeTab: 'profile' | 'ads';
    setActiveTab: (tab: 'profile' | 'ads') => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, setActiveTab }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={`transition-all duration-500 ease-in-out sticky top-24 shrink-0 flex flex-col
                ${isCollapsed ? 'w-20' : 'w-72'} 
                w-full md:w-auto md:min-w-0`}
        >
            <div className="flex items-center justify-between mb-6 px-4">
                {!isCollapsed && <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-body">Settings</p>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all hidden md:block border border-transparent hover:border-slate-200"
                >
                    {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                </button>
            </div>

            <div className={`flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide px-2`}>
                {(['profile', 'ads'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${activeTab === tab 
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                            ${isCollapsed ? 'justify-center px-0 h-12' : ''}`}
                        title={isCollapsed ? (tab === 'profile' ? 'Profile' : 'Ad Accounts') : ''}
                    >
                        {tab === 'profile' ? <User size={18} /> : <Globe size={18} />}
                        {!isCollapsed && (tab === 'profile' ? 'Personal Details' : 'Ad Platforms')}
                        {!isCollapsed && activeTab === tab && (
                            <ChevronRight size={14} className="ml-auto opacity-60" />
                        )}
                    </button>
                ))}
            </div>

            {/* Status Cards */}
            <div className={`mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3 transition-opacity duration-300 ${isCollapsed ? 'items-center px-2' : 'px-2'}`}>
                {!isCollapsed && (
                    <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2 font-body px-2">
                        Account Status
                    </p>
                )}

                {/* Tier badge */}
                <div className={`rounded-2xl border border-slate-100 flex items-center bg-white shadow-sm transition-all
                    ${isCollapsed ? 'w-10 h-10 justify-center p-0' : 'p-4 gap-3'}`}>
                    <div className={`rounded-lg flex items-center justify-center shrink-0 bg-slate-900 shadow-sm
                        ${isCollapsed ? 'w-8 h-8' : 'w-9 h-9'}`}>
                        <Zap size={16} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <div className="text-[12px] font-bold text-slate-900 font-body">Pro Plan</div>
                            <div className="text-[10px] text-slate-400 font-medium font-body leading-tight">Active Membership</div>
                        </div>
                    )}
                </div>

                {/* Security */}
                <div className={`rounded-2xl bg-white border border-slate-100 flex items-center transition-all shadow-sm
                    ${isCollapsed ? 'w-10 h-10 justify-center p-0' : 'p-4 gap-3'}`}>
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <ShieldCheck size={18} className="text-emerald-500" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <div className="text-[12px] font-bold text-slate-900 font-body">Verified</div>
                            <div className="text-[10px] text-slate-400 font-medium font-body leading-tight">Secure Account</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default ProfileSidebar;
