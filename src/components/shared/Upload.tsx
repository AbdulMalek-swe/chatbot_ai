import type { ReactNode } from 'react';
import PrimaryBtn from './PrimaryBtn';

// --------------USAGE EXAMPLE:------------------

//             <Upload
//             imgSrc="/logo.png"
//             title="Powered by"
//             text="My Company"
//             btnLabel="Learn"
//             btnOnClick={() => console.log('clicked')}
//             btnClassName="text-[12px] font-medium"
//           />

interface UploadProps {
  imgSrc: string;
  title: string | ReactNode;
  text: string | ReactNode;
  className?: string;
  btnLabel?: string;
  btnOnClick?: () => void;
  btnClassName?: string;
}

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');

function Upload({
  imgSrc,
  title,
  text,
  className,
  btnLabel,
  btnOnClick,
  btnClassName,
}: UploadProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 p-2 w-sm rounded-2xl bg-[#F7F7F7]',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div>
          <img src={imgSrc} alt="logo" className="h-10 w-10 object-contain" />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold font-inter">{title}</p>
          <p className="text-[12px] font-normal  text-[#62646A]">{text}</p>
        </div>
      </div>

      {btnLabel && (
        <PrimaryBtn onClick={btnOnClick} className={cn(btnClassName!)}>
          {btnLabel}
        </PrimaryBtn>
      )}
    </div>
  );
}

export default Upload;
