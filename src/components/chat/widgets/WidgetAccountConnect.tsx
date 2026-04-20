import React from 'react';
import Upload from '../../shared/Upload';

interface WidgetAccountConnectProps {
    onConfirm?: () => void;
}

export default function WidgetAccountConnect({ onConfirm }: WidgetAccountConnectProps) {
    return (
        <div className="w-full max-w-[400px] animate-fade-up">
            <Upload 
                imgSrc="/Meta.png" 
                title="Meta ad account" 
                text="Facebook, Instagram"
                btnLabel="Connect"
                btnOnClick={onConfirm}
                className="w-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                btnClassName="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
            />
        </div>
    );
}
