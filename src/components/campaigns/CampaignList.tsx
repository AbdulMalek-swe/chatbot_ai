import { useState } from 'react';
import { Play, ChevronDown, Plus, Image } from 'lucide-react';

const CampaignList = () => {
    const tabs = ["All", "Running Campaigns", "Past Campaigns"];
    const [activeTab, setActiveTab] = useState("All");

    const campaigns = [
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Active",
            views: 202,
            completion: "92.7%",
            stats: [
                { label: "Impr", value: "207" },
                { label: "100%", value: "192" },
                { label: "50%", value: "194" },
                { label: "CTR", value: "0%" },
                { label: "Reach", value: "113" },
                { label: "Cost/View", value: "0.18" }
            ]
        },
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Active",
            views: 202,
            completion: "92.7%",
            stats: [
                { label: "Impr", value: "207" },
                { label: "100%", value: "192" },
                { label: "50%", value: "194" },
                { label: "CTR", value: "0%" },
                { label: "Reach", value: "113" },
                { label: "Cost/View", value: "0.18" }
            ]
        },
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Active",
            views: 202,
            completion: "92.7%",
            stats: [
                { label: "Impr", value: "207" },
                { label: "100%", value: "192" },
                { label: "50%", value: "194" },
                { label: "CTR", value: "0%" },
                { label: "Reach", value: "113" },
                { label: "Cost/View", value: "0.18" }
            ]
        },
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Active",
            views: 202,
            completion: "92.7%",
            stats: [
                { label: "Impr", value: "207" },
                { label: "100%", value: "192" },
                { label: "50%", value: "194" },
                { label: "CTR", value: "0%" },
                { label: "Reach", value: "113" },
                { label: "Cost/View", value: "0.18" }
            ]
        },
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Active",
            views: 202,
            completion: "92.7%",
            stats: [
                { label: "Impr", value: "207" },
                { label: "100%", value: "192" },
                { label: "50%", value: "194" },
                { label: "CTR", value: "0%" },
                { label: "Reach", value: "113" },
                { label: "Cost/View", value: "0.18" }
            ]
        },
        {
            title: "Devs On Steroids 🌋",
            subtitle: "Final Video Ad",
            date: "Mar 17–20",
            status: "Completed",
            views: null,
            completion: null,
            clicks: 120,
            ctrMain: "2.4%",
            stats: [
                { label: "Impr", value: "5200" },
                { label: "Reach", value: "3100" },
                { label: "CPC", value: "3.2" },
                { label: "CPM", value: "140" },
                { label: "Freq", value: "1.6" },
                { label: "Cost", value: "384" }
            ]
        }
    ];

    return (
        <div className="w-full flex flex-col bg-[#F9F9FB] rounded-t-xl font-sans">
            {/* Top Bar Navigation Area */}
            <div className="flex flex-row justify-between items-center px-8 flex-wrap pt-6 pb-2 gap-4">
                <button className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2 text-sm font-medium">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=punk" className="w-5 h-5 rounded-full" alt="avatar" />
                    punkai 1.1
                    <ChevronDown size={16} className="text-slate-400" />
                </button>
                <button className="flex items-center gap-2 bg-black text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Plus size={16} /> New Chat
                </button>
            </div>

            {/* Content Container */}
            <div className="w-full mt-4 px-8 pb-12">
                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-white border border-slate-100 rounded-xl w-fit shadow-sm mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {campaigns.map((camp, idx) => (
                        <div key={idx} className="bg-[#FDFBF6] border border-[#f0eedd] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-base">{camp.title}</h3>
                                    <p className="text-slate-400 text-xs mt-1">{camp.subtitle}</p>
                                    <p className="text-slate-800 font-medium text-xs mt-2">{camp.date}</p>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-sm">
                                        <div className={`w-2 h-2 rounded-full ${camp.status === "Active" ? "bg-green-500" : "bg-blue-500"}`}></div>
                                        <span className="text-xs font-semibold text-slate-700">{camp.status}</span>
                                    </div>
                                    <button className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600 bg-white shadow-sm">
                                        {camp.status === 'Active' ? <Play size={16} /> : <Image size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Main Metrics Pill */}
                            <div className="bg-[#F5F4EF] rounded-xl p-3 flex justify-between items-center mb-6">
                                {camp.views ? (
                                    <>
                                        <div className="flex items-baseline gap-1.5 text-slate-800">
                                            <span className="font-bold text-lg">{camp.views}</span>
                                            <span className="text-xs font-medium">Video Views</span>
                                        </div>
                                        <div className="w-px h-8 bg-slate-200"></div>
                                        <div className="flex items-baseline gap-1.5 text-slate-800">
                                            <span className="font-bold text-lg">{camp.completion}</span>
                                            <span className="text-xs font-medium">Completion</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-baseline gap-1.5 text-slate-800">
                                            <span className="font-bold text-lg">{camp.clicks}</span>
                                            <span className="text-xs font-medium">Clicks</span>
                                        </div>
                                        <div className="w-px h-8 bg-slate-200"></div>
                                        <div className="flex items-baseline gap-1.5 text-slate-800">
                                            <span className="font-bold text-lg">{camp.ctrMain}</span>
                                            <span className="text-xs font-medium">CTR</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Secondary Metrics */}
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 px-1 flex-1">
                                {camp.stats.map((stat, i) => (
                                    <div key={i} className="flex gap-1.5 text-xs">
                                        <span className="text-slate-500">{stat.label}:</span>
                                        <span className="text-slate-800 font-medium">{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-[#111111] hover:bg-black text-white py-3 rounded-xl text-sm font-medium transition-colors mt-auto shadow-md">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CampaignList;
