import { Check, X } from 'lucide-react';
import type { PendingActionBlock } from '../../../types/chat';
import WidgetLayout from './WidgetLayout';

interface WidgetPermissionProps {
  content: PendingActionBlock['content'];
  onConfirm?: (value: string) => void;
}

export default function WidgetPermission({
  content,
  onConfirm,
}: WidgetPermissionProps) {
  return (
    <WidgetLayout mode="single">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 animate-fade-up">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-100">
            <Check size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{content.prompt}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Please confirm to proceed.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onConfirm?.("no")}
            className="flex-1 py-4 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl font-bold text-md hover:bg-slate-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          
          <button
            onClick={() => onConfirm?.("yes")}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-md hover:bg-black transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          >
            <Check size={18} className="text-primary-400" />
            Confirm
          </button>
        </div>
      </div>
    </WidgetLayout>
  );
}
