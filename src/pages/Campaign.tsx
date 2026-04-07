import React, { useEffect, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import CampaignList from '../components/campaigns/CampaignList';
import CampaignDetail from '../components/campaigns/CampaignDetail';

const CampaignPage: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);

    }, []);
    return (
        <div className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative bg-white m-2 rounded-2xl shadow-xl">
                <div className="flex-1 overflow-y-auto">
                    <CampaignList />
                    {/* Divider or padding between two designs since user wanted both displayed */}
                    <div className="w-full bg-[#F9F9FB] pb-12">
                        <div className="max-w-[1200px] mx-auto px-8 py-8 border-t border-slate-200">
                            <h3 className="text-sm font-bold text-slate-400 mb-4 px-2 uppercase tracking-wide">Detailed View Preview (Lower Design)</h3>
                            <div className="shadow-lg rounded-xl overflow-hidden border border-slate-200">
                                <CampaignDetail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignPage;
