import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PlatformCardProps {
    name: string;
    description: string;
    accentColor: string;
    logoUrl: string;
    connected: boolean;
    accountName?: string | null;
    onConnect: () => void;
    onDisconnect: () => void;
    disabled: boolean;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
    name, description, accentColor, logoUrl, connected, accountName, onConnect, onDisconnect, disabled,
}) => {
    return (
        <div className="group relative bg-white border border-slate-100 rounded-[32px] p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col h-full">
            {/* Accent subtle glow */}
            <div 
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-opacity duration-500"
                style={{ background: accentColor }}
            />

            {/* Top row */}
            <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden">
                    <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
                </div>

                {connected ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm shadow-emerald-100/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Connected</span>
                    </div>
                ) : (
                    <div className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Disconnected</span>
                    </div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">{name}</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-grow font-body">{description}</p>

            <div className="mt-auto pt-6 border-t border-slate-50">
                {connected ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-body">Account Instance</p>
                            <p className="text-[14px] font-bold text-slate-900 truncate font-body">
                                {accountName || 'Active Business Account'}
                            </p>
                        </div>
                        <button
                            onClick={onDisconnect}
                            disabled={disabled}
                            className="w-full px-5 py-3.5 rounded-xl border border-rose-100 bg-rose-50/30 hover:bg-rose-50 text-rose-500 text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onConnect}
                        disabled={disabled}
                        className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black text-white px-6 flex items-center justify-between transition-all group/btn shadow-lg shadow-slate-200/50 active:scale-95 disabled:opacity-50"
                    >
                        <span className="text-[13px] font-bold">Connect Platform</span>
                        <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlatformCard;
