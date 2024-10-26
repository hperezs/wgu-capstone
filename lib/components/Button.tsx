import { joinClasses } from "@/lib/helpers";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
}) => {
  const baseClasses = "px-4 py-2 rounded transition-colors duration-300";
  const buttonClasses = {
    primary:
      "bg-emerald-900 text-white hover:bg-emerald-800 border border-emerald-900 hover:border-emerald-500",
    secondary:
      "bg-transparent text-white border border-zinc-700 hover:bg-zinc-900 hover:border-zinc-500",
  };

  return (
    <button
      onClick={onClick}
      className={joinClasses(
        baseClasses,
        buttonClasses[variant],
        className || ""
      )}
    >
      {children}
    </button>
  );
};
