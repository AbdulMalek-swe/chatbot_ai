import type { ReactNode } from 'react';

interface PrimaryBtnProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  leftSection?: ReactNode | null;
  altered?: boolean;
  disabled?: boolean;
}

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const PrimaryBtn = ({
  children,
  className,
  onClick,
  leftSection = null,
  disabled = false,
}: PrimaryBtnProps) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-normal text-sm uppercase tracking-wider hover:bg-black transition-all shadow-lg font-inter `,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {leftSection && <span>{leftSection}</span>}
      {children}
    </button>
  );
};

export default PrimaryBtn;
