import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AdPlatformStatus {
    platform: string;
    connected: boolean;
    account_id: string | null;
    account_name: string | null;
    accessible_accounts: Array<{ id: string; name: string }> | null;
}

interface AdsContextType {
    platforms: AdPlatformStatus[];
    loading: boolean;
    connectPlatform: (platform: 'google' | 'meta') => Promise<void>;
    disconnectPlatform: (platform: 'google' | 'meta') => Promise<void>;
    refreshStatus: () => Promise<void>;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const AdsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [platforms, setPlatforms] = useState<AdPlatformStatus[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshStatus = async () => {
        // Mock data
        setPlatforms([
            {
                platform: 'meta',
                connected: true,
                account_id: 'act_123456789',
                account_name: 'Shawarma Palace Ads',
                accessible_accounts: [{ id: 'act_123456789', name: 'Shawarma Palace Ads' }]
            },
            {
                platform: 'google',
                connected: false,
                account_id: null,
                account_name: null,
                accessible_accounts: null
            }
        ]);
        setLoading(false);
    };

    useEffect(() => {
        refreshStatus();
    }, []);

    const connectPlatform = async (platform: 'google' | 'meta') => {
        console.log(`Mock connecting to ${platform}`);
        setLoading(true);
        setTimeout(() => {
            setPlatforms(prev => prev.map(p => 
                p.platform === platform ? { ...p, connected: true, account_id: 'mock_id', account_name: 'Mock Account' } : p
            ));
            setLoading(false);
        }, 1000);
    };

    const disconnectPlatform = async (platform: 'google' | 'meta') => {
        setLoading(true);
        setTimeout(() => {
            setPlatforms(prev => prev.map(p => 
                p.platform === platform ? { ...p, connected: false, account_id: null, account_name: null } : p
            ));
            setLoading(false);
        }, 1000);
    };

    return (
        <AdsContext.Provider value={{ platforms, loading, connectPlatform, disconnectPlatform, refreshStatus }}>
            {children}
        </AdsContext.Provider>
    );
};

export const useAds = () => {
    const context = useContext(AdsContext);
    if (context === undefined) {
        throw new Error('useAds must be used within an AdsProvider');
    }
    return context;
};
