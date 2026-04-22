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
  return (
    <WidgetLayout mode="single">
      <Card className="w-[80%] border rounded-xl shadow-md">
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
                <p className="text-sm text-[#62646A]">Answer this questions please for our better understanding.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl">
            {widget.map((opt: any) => (
              <label
                key={opt.id}
                className="flex items-center border-b border-dashed gap-3 p-3 cursor-pointer hover:bg-gray-50"
              >
                <p className="text-sm ">
                  <span className="text-[#151515] font-inter font-semibold">{opt.content}</span>
                </p>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-md font-inter font-normal text-[#151515]">
              Which one feels right for you, or do you want to stick with Pin
              Point?
            </p>
            <PrimaryBtn
              onClick={() => onConfirm?.()}
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
