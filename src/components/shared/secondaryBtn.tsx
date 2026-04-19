import type { ReactNode } from 'react';

interface SecondaryBtnProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  leftSection?: ReactNode | null;
  altered?: boolean;
}

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const SecondaryBtn = ({
  children,
  className,
  onClick,
  leftSection = null,
}: SecondaryBtnProps) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#DBDBDB] font-normal text-sm uppercase tracking-wider shadow-[inset_0_-3px_2px_rgba(0,0,0,0.07)] hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out font-inter `,
        className,
      )}
      onClick={onClick}
    >
      {leftSection && <span>{leftSection}</span>}
      {children}
    </button>
  );
};

export default SecondaryBtn;