import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import type { PendingActionBlock } from '../../../types/chat';
import WidgetLayout from './WidgetLayout';

interface WidgetStepperInputProps {
  content: PendingActionBlock['content'];
  onConfirm?: (value: string) => void;
}

export default function WidgetStepperInput({
  content,
  onConfirm,
}: WidgetStepperInputProps) {
  const stepper = content.stepper || { default: 0, min: 0, max: 100, step: 1, unit: '' };
  const [value, setValue] = useState(stepper.default);

  const handleIncrement = () => {
    setValue(prev => Math.min(stepper.max, prev + stepper.step));
  };

  const handleDecrement = () => {
    setValue(prev => Math.max(stepper.min, prev - stepper.step));
  };

  return (
    <WidgetLayout mode="single">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 animate-fade-up">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{content.prompt}</h3>
            <p className="text-sm text-slate-500 font-medium">Use the controls below to adjust the value.</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={handleDecrement}
            className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
          >
            <Minus size={24} />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="text-5xl font-black text-slate-900 tracking-tight">
              {value}
            </div>
            <div className="text-xs font-black text-primary-500 uppercase tracking-widest mt-1">
              {stepper.unit}
            </div>
          </div>

          <button
            onClick={handleIncrement}
            className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-4">
           <input 
              type="range" 
              min={stepper.min} 
              max={stepper.max} 
              step={stepper.step}
              value={value} 
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            
            <button
              onClick={() => onConfirm?.(value.toString())}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-md hover:bg-black transition-all active:scale-[0.98] shadow-lg"
            >
              Confirm Value
            </button>
        </div>
      </div>
    </WidgetLayout>
  );
}
