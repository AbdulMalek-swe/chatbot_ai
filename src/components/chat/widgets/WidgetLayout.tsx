import React from 'react';

interface WidgetLayoutProps {
    children?: React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    aiText?: React.ReactNode;
    mode?: 'single' | 'split';
    className?: string;
    showLogo?: boolean;
}

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ 
    children, 
    leftContent, 
    rightContent, 
    aiText,
    mode = 'single',
    className = "",
    showLogo = false
}) => {
    // Logo component
    const logoBlock = showLogo && (
        <div className="shrink-0 flex items-center justify-center transition-all mr-4">
            <div className="bg-[#C0C0C0] rounded-full pt-2.75 pr-2.75 pb-2.75 pl-1.25 flex items-center gap-[9.17px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 transition-transform group-hover:scale-110 duration-500 rounded-full" />
            </div>
        </div>
    );

    if (mode === 'split') {
        return (
            <div className={`w-full max-w-7xl flex flex-col transition-all duration-500 gap-6 ${className}`}>
                <div className="flex flex-col lg:flex-row gap-6 animate-fade-up">
                    {/* Left Panel: (AI Text + UI) or Custom Content */}
                    <div className="flex-1 flex flex-col gap-6">
                        {aiText && (
                            <div className="flex items-start">
                                {logoBlock}
                                <div className="flex-1 min-w-0">
                                    {aiText}
                                </div>
                            </div>
                        )}
                        
                        {(leftContent || children) && (
                            <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                                {leftContent || children}
                            </div>
                        )}
                    </div>
                    
                    {/* Right Panel: Map or Visuals */}
                    {rightContent && (
                        <div className="flex-1 min-h-125 lg:h-auto rounded-3xl overflow-hidden border border-slate-200 relative shadow-inner bg-slate-50">
                            {rightContent}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default Single Logic
    return (
        <div className={`w-full max-w-4xl flex flex-col gap-4 animate-fade-up ${className}`}>
             {(aiText || children || leftContent) && (
                <div className="flex items-start">
                    {logoBlock}
                    <div className="flex-1 min-w-0 space-y-4">
                        {aiText}
                        {(children || leftContent) && (
                            <div className="w-full">
                                {children || leftContent}
                            </div>
                        )}
                    </div>
                </div>
             )}
             {rightContent && (
                 <div className="w-full rounded-3xl overflow-hidden border border-slate-200 min-h-75 bg-slate-50">
                     {rightContent}
                 </div>
             )}
        </div>
    );
};

export default WidgetLayout;
