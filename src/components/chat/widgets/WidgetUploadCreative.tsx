import React, { useRef } from 'react';
import Upload from '../../shared/Upload';

interface WidgetUploadCreativeProps {
    onConfirm?: () => void;
}

export default function WidgetUploadCreative({ onConfirm }: WidgetUploadCreativeProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (onConfirm) {
                onConfirm();
            }
        }
    };

    return (
        <div className="w-full max-w-[400px] animate-fade-up">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                onChange={handleFileChange} 
                accept="image/*,video/*"
            />
            <Upload 
                imgSrc="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' x2='12' y1='3' y2='15'/></svg>"
                title="Upload Creatives" 
                text="Images or Videos"
                btnLabel="Upload"
                btnOnClick={handleUploadClick}
               className="w-xl! p-4!"
                btnClassName="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
            />
        </div>
    );
}
