import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/client';

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
        try {
            const response = await api.get('/ads/status');
            setPlatforms(response.data);
        } catch (error) {
            console.error('Failed to fetch ad platform status', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshStatus();
    }, []);

    const connectPlatform = async (platform: 'google' | 'meta') => {
        try {
            const response = await api.post(`/ads/connect/${platform}`);
            const { authorization_url } = response.data;
            if (authorization_url) {
                window.location.href = authorization_url;
            }
        } catch (error) {
            console.error(`Failed to initiate ${platform} connection`, error);
            throw error;
        }
    };

    const disconnectPlatform = async (platform: 'google' | 'meta') => {
        setLoading(true);
        try {
            await api.delete(`/ads/disconnect/${platform}`);
            
            // Clear the cookie for this platform
            document.cookie = `${platform}_ads_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
            
            await refreshStatus();
        } catch (error) {
            console.error(`Failed to disconnect ${platform}`, error);
            throw error;
        } finally {
            setLoading(false);
        }
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
