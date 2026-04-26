import { useState } from 'react';
import PrimaryBtn from '../../shared/PrimaryBtn';
import WidgetLayout from './WidgetLayout';
import type { PendingActionBlock } from '../../../types/chat';

// --- Simple Card & Button Components (no shadcn needed) ---
function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export default function WidgetOptionSelection({
  content,
  onConfirm,
}: {
  content: PendingActionBlock['content'];
  onConfirm?: (value: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    content.prefill
  );

  return (
    <WidgetLayout mode="single">
      <Card className="w-[86%] border rounded-xl shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border">
                <img src="/locationIcon.png" alt="Location" />
              </div>
              <div>
                <p className="text-[#151515] font-inter font-semibold text-md">
                  {content.prompt}
                </p>
                <p className="text-sm text-[#62646A]">
                  Please select one of the options below.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#DBDBDB]/50">
            {content.options.map((option: string, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`border-b border-dashed p-3 cursor-pointer transition-colors ${
                  selectedOption === option ? 'bg-primary-50' : 'hover:bg-gray-50'
                } last:border-b-0`}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                  }`}>
                    {selectedOption === option && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-sm ${selectedOption === option ? 'text-primary-900 font-medium' : 'text-gray-700'}`}>
                    {option}
                  </span>
                </label>
              </div> 
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-sm font-inter font-normal text-[#62646A]">
              {selectedOption ? `Selected: ${selectedOption.split('—')[0].trim()}` : 'Please make a selection'}
            </p>
            <PrimaryBtn
              onClick={() => {
                if (selectedOption) {
                  onConfirm?.(selectedOption);
                }
              }}
              disabled={!selectedOption || !onConfirm}
              className={(!onConfirm || !selectedOption) ? 'opacity-50 cursor-not-allowed!' : ''}
            >
              Confirm
            </PrimaryBtn>
          </div>
        </CardContent>
      </Card>
    </WidgetLayout>
  );
}
