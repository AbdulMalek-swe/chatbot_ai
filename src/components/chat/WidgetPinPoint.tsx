//import { MapPin, Pencil } from "lucide-react";
import { MapPin, Pencil } from "lucide-react";
// --- Simple Card & Button Components (no shadcn needed) ---
function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`bg-white border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

function CardContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return <div className={className}>{children}</div>;
}

function Button({ children, className = "", variant = "default", size = "md", ...props }: { children: React.ReactNode, className?: string, variant?: string, size?: string, props?: any }) {
    const base = "inline-flex items-center justify-center rounded-lg font-medium transition";

    const variants: Record<string, string> = {
        default: "bg-black text-white hover:bg-black/90",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    };

    const sizes: Record<string, string> = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
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



export default function CampaignDirection({
    widget
}: {
    widget: any;
}) {


    return (
        <div className="flex items-center     ">
            <Card className="  rounded-2xl shadow-md">
                <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full border">
                                <MapPin size={16} />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Campaign Direction</p>
                                <p className="text-xs text-gray-500">456 Elm Street.</p>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" className="gap-1">
                            <Pencil size={14} /> Edit
                        </Button>
                    </div>

                    {/* Options */}
                    <div className="border rounded-lg divide-y">
                        {widget.map((opt: any) => (
                            <label
                                key={opt.id}
                                className="flex  gap-2  p-3 cursor-pointer hover:bg-gray-50  "
                            >
                                <input
                                    type="checkbox"
                                    name="campaign"
                                // checked={selected === opt.id}
                                // onChange={() => setSelected(opt.id)}

                                />
                                <p className="text-sm  "> <span className="font-bold ">{opt.type}</span>  {opt.content} </p>

                            </label>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-600">
                            Which one feels right for you, or do you want to stick with Pin
                            Point?
                        </p>
                        <Button className="bg-black text-white hover:bg-black/90">
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
