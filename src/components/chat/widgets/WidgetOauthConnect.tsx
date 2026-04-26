import type { PendingActionBlock } from '../../../types/chat';
import MetaConnect from '../../shared/MetaConnect';

interface WidgetOauthConnectProps {
  content: PendingActionBlock['content'];
  onConfirm?: (value: string) => void;
}

export default function WidgetOauthConnect({
  content,
  onConfirm,
}: WidgetOauthConnectProps) {
  const handleConnect = async () => {
    // In a real app, we might redirect to content.options[0]
    // For now, we simulate the connection
    onConfirm?.("connected");
  };

  return (
    <div className="animate-fade-up">
      <MetaConnect onConnect={handleConnect} />
      {content.options?.[0] && (
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Connection URL: {content.options[0]}
        </p>
      )}
    </div>
  );
}
