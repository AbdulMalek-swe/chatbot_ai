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

function Button({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  size?: string;
  props?: any;
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition';

  const variants: Record<string, string> = {
    default: 'bg-black text-white hover:bg-black/90',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function CampaignDirection({ widget }: { widget: any }) {
  return (
    <WidgetLayout mode="single">
      <Card className="w-full border rounded-xl shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border">
                <img src="/locationIcon.png" alt="Location" />
              </div>
              <div>
                <p className="text-[#151515] font-inter font-semibold text-md">
                  Campaign Direction
                </p>
                <p className="text-sm text-[#62646A]">456 Elm Street.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl">
            {widget.map((opt: any) => (
              <label
                key={opt.id}
                className="flex items-center border-b border-dashed gap-3 p-3 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name="campaign"
                  className="w-5 h-5  cursor-pointer accent-black"
                />
                <p className="text-sm ">
                  {' '}
                  <span className="font-semibold ">{opt.type}</span>{' '}
                  <span className="text-sm text-[#62646A]">{opt.content}</span>
                </p>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-md font-inter font-normal text-[#151515]">
              Which one feels right for you, or do you want to stick with Pin
              Point?
            </p>
            <PrimaryBtn>Confirm</PrimaryBtn>
          </div>
        </CardContent>
      </Card>
    </WidgetLayout>
  );
}
