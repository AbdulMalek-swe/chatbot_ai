import { useChat } from '../../../contexts/ChatContext';
import MetaConnect from '../../shared/MetaConnect';

interface WidgetAccountConnectProps {
  onConfirm?: () => void;
}

export default function WidgetAccountConnect({
  onConfirm,
}: WidgetAccountConnectProps) {
  const { sendMessage } = useChat();

  const handleConnect = async () => {
    await sendMessage('[Connects account]');
    onConfirm?.();
  };

  return (
    <div className=" animate-fade-up">
      <MetaConnect onConnect={handleConnect} />
    </div>
  );
}
