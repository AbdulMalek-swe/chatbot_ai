import React from 'react';
import { 
  Target, 
  MapPin, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  BrainCircuit, 
  Zap, 
  Navigation, 
  Globe, 
  Layers,
  Search,
  History
} from 'lucide-react';

interface AgentStateViewProps {
  data: any;
}

const AgentStateView: React.FC<AgentStateViewProps> = ({ data }) => {
  const agentState = data?.agent_state || data;
  const profile = agentState?.extracted_profile;

  if (!agentState) return <div className="text-slate-400">No data available</div>;

  const StatBox = ({ icon: Icon, label, value, colorClass = "text-primary-600" }: any) => (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col gap-1.5 hover:border-primary-200 hover:shadow-sm transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        <Icon size={12} className={colorClass} />
        {label}
      </div>
      <div className="text-sm font-bold text-slate-800 truncate">{value || 'N/A'}</div>
    </div>
  );

  const Badge = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
    <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
      active 
        ? 'bg-primary-50 border-primary-200 text-primary-700' 
        : 'bg-slate-50 border-slate-100 text-slate-400'
    }`}>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* Header Info */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-100 border border-primary-200 flex items-center justify-center">
            <BrainCircuit size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-none">Agent Intelligence State</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
              Current Step: <span className="text-primary-600">{agentState.current_step}</span>
            </p>
          </div>
        </div>

        {agentState.thinking && (
          <div className="bg-primary-50/50 border border-primary-100 p-6 rounded-2xl relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap size={28} className="text-primary-600" />
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600">
                <Zap size={14} />
              </div>
              <div>
                <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest block mb-1">AI Reasoning</span>
                <p className="text-[13px] text-slate-700 italic leading-relaxed font-medium">
                  "{agentState.thinking}"
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Profile Data */}
      {profile && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatBox icon={Globe} label="Business" value={profile.business_name} />
          <StatBox icon={Target} label="Goal" value={profile.primary_goal?.replace(/_/g, ' ')} />
          <StatBox icon={DollarSign} label="Monthly Budget" value={`$${profile.monthly_budget_usd}`} />
          <StatBox icon={Users} label="Target Audience" value={profile.target_audience} />
          <StatBox icon={Layers} label="Platforms" value={profile.preferred_platforms?.join(', ')} />
          <StatBox icon={Search} label="Targeting Method" value={profile.targeting_method} />
        </section>
      )}

      {/* Metadata & Flags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white border border-slate-100 p-7 rounded-3xl shadow-sm">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <Navigation size={12} className="text-primary-500" /> Execution Flags
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <Badge active={agentState.requires_geo_research}>Geo Research Req.</Badge>
            <Badge active={agentState.requires_deterministic_extraction}>Determ. Extraction</Badge>
            <Badge active={agentState.pois_confirmed}>POIs Confirmed</Badge>
            <Badge active={agentState.targeting_validated}>Targeting Validated</Badge>
            <Badge active={agentState.strategy_approved}>Strategy Approved</Badge>
            <Badge active={agentState.budget_starved}>Budget Starved</Badge>
          </div>
        </section>

        <section className="bg-white border border-slate-100 p-7 rounded-3xl shadow-sm">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <MapPin size={12} className="text-primary-500" /> Geographic Scope
          </h4>
          <div className="space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium tracking-tight">Location Scope</span>
                <span className="text-slate-800 font-bold capitalize">{agentState.location_scope || 'Global'}</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium tracking-tight">Total POIs Identified</span>
                <span className="text-primary-700 font-extrabold">{agentState.poi_count || 0}</span>
             </div>
             {agentState.completed_geo_searches?.length > 0 && (
                <div className="pt-3 border-t border-slate-50">
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest font-black block mb-3">Completed Grid Searches</span>
                    <div className="flex flex-wrap gap-2">
                        {agentState.completed_geo_searches.map((city: string) => (
                            <span key={city} className="text-[11px] text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 font-medium">{city}</span>
                        ))}
                    </div>
                </div>
             )}
          </div>
        </section>
      </div>

      {/* POI Summary */}
      {agentState.poi_summary && (
        <section className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <History size={12} className="text-primary-500" /> POI Density Breakdown
          </h4>
          
          <div className="space-y-4">
            {agentState.poi_summary.split('\n').map((line: string, i: number) => {
              if (line.includes('Total')) {
                const match = line.match(/\*\*Total\*\*:\s*(\d+)\s*POIs/);
                if (match) {
                  return (
                    <div key={i} className="flex items-center justify-between p-4 bg-primary-50/30 rounded-2xl border border-primary-100/50 mb-6">
                      <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Global Aggregate</span>
                      <span className="text-lg font-black text-primary-800">{match[1]} <span className="text-[10px] uppercase tracking-normal font-bold opacity-60">Points of Interest</span></span>
                    </div>
                  );
                }
              }

              // Parse location lines: - **Montreal**: 100 POIs (Canadian Tire, ...)
              const locMatch = line.match(/-\s+\*\*(.*)\*\*:\s*(\d+)\s*POIs\s*\((.*)\)/);
              if (locMatch) {
                const [, city, count, examples] = locMatch;
                return (
                  <div key={i} className="group bg-white border border-slate-100 p-5 rounded-2xl hover:border-primary-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                          <MapPin size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-800">{city}</span>
                      </div>
                      <span className="text-xs font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                        {count} <span className="text-[10px] opacity-70">POIs</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {examples.split(',').map((ex, idx) => {
                        const cleanEx = ex.trim().replace('(+', '').replace('more)', '').trim();
                        const isCount = ex.includes('+');
                        return (
                          <span key={idx} className={`text-[10px] px-2 py-0.5 rounded-md border ${
                             isCount 
                               ? 'bg-slate-900 text-white border-slate-900 font-bold' 
                               : 'bg-white text-slate-500 border-slate-100'
                          }`}>
                            {isCount ? `+${cleanEx} more` : cleanEx}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </section>
      )}

      {/* Extraction Confidence */}
      {profile?.extraction_confidence !== undefined && (
        <section className="flex items-center gap-6 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Extraction Quality</span>
              <span className="text-xs font-bold text-primary-700 tracking-tight">{Math.round(profile.extraction_confidence * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-primary-600 transition-all duration-1000 shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" 
                  style={{ width: `${profile.extraction_confidence * 100}%` }}
                />
            </div>
          </div>
          <div className="shrink-0">
            {profile.extraction_confidence >= 0.8 ? (
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <CheckCircle2 size={24} className="text-green-600" />
                </div>
            ) : (
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                    <AlertCircle size={24} className="text-amber-600" />
                </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AgentStateView;
