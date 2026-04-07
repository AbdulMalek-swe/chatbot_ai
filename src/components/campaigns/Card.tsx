import { Circle, MoreVertical } from "lucide-react";

const Card = ({ status = "Active", clicks = false }) => {
    return (
        <div className="bg-[#f7f5ef] rounded-2xl shadow-sm p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-sm">Devs On Steroids 🚀</h3>
                    <p className="text-xs text-gray-500">Final Video Ad</p>
                    <p className="text-xs text-gray-400">Mar 17–20</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${status === "Active" ? "bg-green-100 text-green-700" : status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}>
                        <Circle size={10} /> {status}
                    </span>
                    <MoreVertical size={16} className="text-gray-500" />
                </div>
            </div>

            {/* Metrics */}
            {!clicks ? (
                <div className="bg-white rounded-xl p-3 text-xs shadow-sm mb-3">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">202 Video Views</span>
                        <span className="text-gray-500">92.7% Completion</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-500">
                        <p>Impr: 207</p>
                        <p>100%: 192</p>
                        <p>50%: 194</p>
                        <p>CTR: 0%</p>
                        <p>Reach: 113</p>
                        <p>Cost/View: 0.18</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl p-3 text-xs shadow-sm mb-3">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">120 Clicks</span>
                        <span className="text-gray-500">2.4% CTR</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-500">
                        <p>Impr: 5200</p>
                        <p>Reach: 3100</p>
                        <p>CPC: 3.2</p>
                        <p>CPM: 140</p>
                        <p>Freq: 1.6</p>
                        <p>Cost: 364</p>
                    </div>
                </div>
            )}

            {/* Button */}
            <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
                View Details
            </button>
        </div>
    );
};

export default Card;
