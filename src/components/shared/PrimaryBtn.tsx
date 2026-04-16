import type { ReactNode } from 'react';

interface PrimaryBtnProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  leftSection?: ReactNode | null;
  altered?: boolean;
}

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const PrimaryBtn = ({
  children,
  className,
  onClick,
  leftSection = null,
}: PrimaryBtnProps) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-normal text-md uppercase tracking-wider hover:bg-black transition-all shadow-lg font-inter`,
        className,
      )}
      onClick={onClick}
    >
      {leftSection && <span>{leftSection}</span>}
      {children}
    </button>
  );
};

export default PrimaryBtn;
