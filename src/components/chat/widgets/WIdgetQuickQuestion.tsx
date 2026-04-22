import { useState } from 'react';
import PrimaryBtn from '../../shared/PrimaryBtn';
import WidgetLayout from './WidgetLayout';

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

export default function WIdgetQuickQuestion({
  widget,
  onConfirm,
}: {
  widget: any;
  businessName?: string;
  businessAddress?: string;
  onConfirm?: () => void;
}) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>(
    widget.reduce((acc: any, opt: any) => ({ ...acc, [opt.id]: '' }), {}),
  );

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
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
                  Quick questions:
                </p>
                <p className="text-sm text-[#62646A]">
                  Answer this questions please for our better understanding.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl">
            {widget.map((opt: any) => (
              <div
                key={opt.id}
                className="border-b border-dashed p-3 hover:bg-gray-50"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <p className="text-sm ">
                     <span className="text-[#151515] font-inter font-semibold">
                      {opt.type}-
                    </span>
                    <span className="text-[#151515] font-inter font-semibold">
                      {''}{opt.content}
                    </span>
                  </p>
                </label>
                <input
                  type="text"
                  placeholder="Write your message here"
                  value={answers[opt.id] || ''}
                  onChange={(e) => handleAnswerChange(opt.id, e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-[#DBDBDB] font-normal text-sm tracking-wider shadow-[inset_0_-3px_2px_rgba(0,0,0,0.07)] hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out font-inter focus:outline-none"
                />
              </div> 
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-md font-inter font-normal text-[#151515]">
              Answer this questions please for our better understanding.
            </p>
            <PrimaryBtn
              onClick={() => {
                console.log('Answers:', answers);
                onConfirm?.();
              }}
              className={!onConfirm ? 'opacity-50 cursor-not-allowed!' : ''}
            >
              Confirm
            </PrimaryBtn>
          </div>
        </CardContent>
      </Card>
    </WidgetLayout>
  );
}
