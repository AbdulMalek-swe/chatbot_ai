import React from 'react';
import { ArrowLeft, Edit, ExternalLink, Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const CampaignDetail = () => {
    // Shared Data for Bar Charts
    const barData1 = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 500 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 980 },
        { name: 'May', value: 450 },
        { name: 'Jun', value: 600 },
    ];

    const horizontalData = [
        { name: 'Apr', views: 800, impressions: 1400 },
        { name: 'Mar', views: 2400, impressions: 900 },
        { name: 'Feb', views: 3200, impressions: 1100 },
        { name: 'Jan', views: 1800, impressions: 800 },
    ];

    return (
        <div className="w-full flex flex-col bg-white rounded-t-xl font-sans mt-8 shadow-sm border border-slate-100">
            {/* Header */}
            <div className="flex flex-row justify-between items-start px-8 pt-6 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <button className="text-slate-800 hover:bg-slate-100 p-1.5 rounded-full transition-colors mr-1">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Devs On Steroids</h2>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs font-semibold text-slate-700">Active</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm ml-12 mb-3">Final Video Ad</p>
                    <div className="flex gap-2 ml-12">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full tracking-wide">MAR 17–MAR 20</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full tracking-wide">PUNK POWERED</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors">
                    <Edit size={16} /> Edit
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-12 bg-slate-50/50 pt-8 border-t border-slate-100/50">
                
                {/* 1. Impressions Line/Bar */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> impressions
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Total impressions in selected period</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight">5,420</span>
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md mb-1">+456</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600 text-sm font-bold bg-purple-50 px-2 py-0.5 rounded-full mb-1">
                            <ArrowUpRight size={14} /> 6.2%
                        </div>
                    </div>
                    
                    <div className="h-40 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData1} margin={{top: 15, right: 0, left: -25, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[0, 1200]} ticks={[400, 600, 800, 1000, 1200]} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                    {barData1.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Apr' ? '#111111' : '#F1F5F9'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Video Retention Funnel (CSS MOCK) */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> Video Retention
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Viewer progression across the video</p>
                            <span className="text-xl font-bold text-slate-800 tracking-tight">5,420 Total Impressions</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-purple-600 text-sm font-bold">
                                <ArrowUpRight size={14} /> 92.2%
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Completion</span>
                        </div>
                    </div>

                    <div className="h-40 w-full flex items-center justify-center relative mt-2 pt-4">
                        <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
                            {/* Funnel shape behind */}
                            <path d="M0 0 L400 40 L400 100 L0 140 Z" fill="#E2E3DD" />
                            {/* Inner slices */}
                            <rect x="0" y="35" width="60" height="70" rx="4" fill="#84876b" />
                            <text x="30" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">100%</text>
                            
                            <rect x="80" y="45" width="60" height="50" rx="4" fill="#84876b" opacity="0.9" />
                            <text x="110" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">81%</text>

                            <rect x="160" y="52" width="60" height="36" rx="4" fill="#84876b" opacity="0.8" />
                            <text x="190" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">64%</text>

                            <rect x="240" y="58" width="60" height="24" rx="4" fill="#84876b" opacity="0.75" />
                            <text x="270" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">43%</text>

                            <rect x="320" y="60" width="70" height="20" rx="4" fill="#84876b" opacity="0.7" />
                            <text x="355" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">17%</text>

                            {/* Stat Lines Overlay */}
                            <g fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">
                                <text x="30" y="10">5,426</text>
                                <text x="110" y="24">5,257</text>
                                <text x="190" y="34">5,095</text>
                                <text x="270" y="42">5,041</text>
                                <text x="355" y="45">4,998</text>
                                
                                <text x="30" y="155">Views</text>
                                <text x="110" y="155">25% Watched</text>
                                <text x="190" y="155">50% Watched</text>
                                <text x="270" y="155">100% Watched</text>
                                <text x="355" y="155">Impressions</text>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* 3. Impressions vs Views (Horizontal Bar) */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> Impressions vs Views
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-slate-200"></div>
                            <span className="text-xs text-slate-600 font-medium">Impressions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-[#84876b]"></div>
                            <span className="text-xs text-slate-600 font-medium">Views</span>
                        </div>
                    </div>

                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={horizontalData} margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} ticks={[0, 1000, 2000, 3000, 4000, 5000]} tickFormatter={(val) => val === 0 ? '0' : `${val/1000}k`} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#475569', fontWeight: 600}} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="views" stackId="a" fill="#84876b" radius={[4, 0, 0, 4]} barSize={16} />
                                <Bar dataKey="impressions" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. Cost per Video View */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> Cost per Video View
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Total impressions in selected period</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight">5,420</span>
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md mb-1">+456</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600 text-sm font-bold bg-purple-50 px-2 py-0.5 rounded-full mb-1">
                            <ArrowUpRight size={14} /> 6.2%
                        </div>
                    </div>
                    
                    <div className="h-40 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData1} margin={{top: 15, right: 0, left: -25, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[0, 1200]} ticks={[400, 600, 800, 1000, 1200]} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                    {barData1.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Apr' ? '#84876b' : '#F1F5F9'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 5. CTR */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> CTR
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Total impressions in selected period</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight">5,420</span>
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md mb-1">+456</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600 text-sm font-bold bg-purple-50 px-2 py-0.5 rounded-full mb-1">
                            <ArrowUpRight size={14} /> 6.2%
                        </div>
                    </div>
                    
                    <div className="h-40 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData1} margin={{top: 15, right: 0, left: -25, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[0, 1200]} ticks={[400, 600, 800, 1000, 1200]} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                    {barData1.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Apr' ? '#84876b' : '#F1F5F9'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 6. impressions (duplicate as in image) */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                            <Activity size={18} /> impressions
                        </div>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded hover:bg-slate-100 cursor-pointer">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Total impressions in selected period</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight">5,420</span>
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md mb-1">+456</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600 text-sm font-bold bg-purple-50 px-2 py-0.5 rounded-full mb-1">
                            <ArrowUpRight size={14} /> 6.2%
                        </div>
                    </div>
                    
                    <div className="h-40 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData1} margin={{top: 15, right: 0, left: -25, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} domain={[0, 1200]} ticks={[400, 600, 800, 1000, 1200]} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                    {barData1.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Apr' ? '#111111' : '#F1F5F9'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CampaignDetail;
