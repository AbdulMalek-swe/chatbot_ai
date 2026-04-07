import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="min-h-screen w-full bg-[#0d0d12] relative overflow-hidden flex flex-col font-sans">
            {/* Backgrounds */}
            <div 
                className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center opacity-60 top-44" 
                style={{
                    backgroundImage: `url('/images/background.svg')`,
                }}
            />
            <div 
                className="absolute inset-0 z-0 bg-no-repeat bg-contain bg-center pointer-events-none bottom-10" 
                style={{
                    backgroundImage: `url('/images/corners.svg')`,
                }}
            />

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-8 py-6 w-full max-w-[1440px] mx-auto bg-[#0d0d12] border-b-2 border-slate-800">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Punk Logo" className="w-8 h-8" />
                    <span className="text-white text-2xl font-bold tracking-tight">punk</span>
                </Link>
                
                <Link 
                    to={isLogin ? '/register' : '/login'}
                    className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
                >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </Link>
            </header>

            <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 max-w-7xl mx-auto w-full gap-12 py-12">
                <div className="flex-1 max-w-xl animate-fade-in animation-delay-200">
                    <h1 className="text-white text-5xl md:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-12">
                        Join the AI<br />
                        revolution<br />
                        with Punk
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-sm leading-relaxed opacity-80">
                        Get started with Punkai - AI Advertising app today and experience the power of AI in your Business!
                    </p>
                </div>

                {/* Right Side: Form Content */}
                <div className="w-full max-w-md animate-fade-in animation-delay-500">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AuthLayout;

