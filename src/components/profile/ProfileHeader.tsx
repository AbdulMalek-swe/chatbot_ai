import React from 'react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../contexts/AuthContext';

interface ProfileHeaderProps {
    user: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const navigate = useNavigate();
    const initials = user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'E';

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-slate-200/60 backdrop-blur-xl bg-white/80 px-6 py-4">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/chat')}
                        className="group flex items-center gap-2.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[11px] font-bold tracking-wider uppercase text-slate-600 hover:text-slate-900 transition-all shadow-sm"
                    >
                        <ArrowLeft size={14} />
                        <span className="hidden sm:inline">Back to Chat</span>
                    </button>
                    <div className="w-[1px] h-6 bg-slate-200 hidden sm:block" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 shadow-lg shadow-slate-200">
                            <LayoutDashboard size={16} className="text-white" />
                        </div>
                        <span className="font-display text-[14px] font-bold text-slate-900 tracking-tight hidden xs:block">
                            Settings
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right pr-4 border-r border-slate-200 hidden xs:block">
                        <div className="text-[13px] font-bold text-slate-900 font-body">{user?.full_name}</div>
                        <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-body">{user?.role || 'User'}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-600">
                        {user?.profile_image ? (
                            <img src={user.profile_image} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : initials}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ProfileHeader;
