import { Check, Image as ImageIcon, Video } from 'lucide-react';
import React, { useRef, useState } from 'react';
import Upload from '../../shared/Upload';

interface WidgetUploadCreativeProps {
  onConfirm?: () => void;
}

export default function WidgetUploadCreative({
  onConfirm,
}: WidgetUploadCreativeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setIsUploaded(true);

      // Auto-confirm after a short delay to show success state
      setTimeout(() => {
        if (onConfirm) {
          onConfirm();
        }
      }, 1500);
    }
  };

  if (isUploaded) {
    return (
      <div className="w-full max-w-100 animate-fade-up">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200 animate-bounce">
              <Check size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 font-inter">
                Upload Complete
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {files.length} files processed successfully
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {files.slice(0, 4).map((file, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden"
              >
                {file.type.includes('image') ? (
                  <ImageIcon size={16} className="text-slate-300" />
                ) : (
                  <Video size={16} className="text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-100 animate-fade-up">
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
        className="w-lg! p-4!"
        btnClassName="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
      />
    </div>
  );
}
