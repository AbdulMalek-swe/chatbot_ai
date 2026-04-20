import Upload from './Upload';

interface MetaConnectProps {
  onConnect?: () => void;
}

function MetaConnect({ onConnect }: MetaConnectProps) {
  return (
    <div>
      <Upload
        imgSrc="/Meta.png"
        title=" META ACCOUNT VALIDATION"
        text="Connect Meta Account"
        btnLabel="Connect"
        className="w-xl! p-4!"
        btnClassName="text-[12px] font-normal! py-2.5! px-4!"
        btnOnClick={onConnect}
      />
    </div>
  );
}

export default MetaConnect;
