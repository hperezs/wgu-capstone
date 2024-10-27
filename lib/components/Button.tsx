import { joinClasses } from "@/lib/helpers";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
  disabled,
}) => {
  const baseClasses =
    "px-4 py-2 flex items-center rounded transition-colors duration-300";
  const buttonClasses = {
    primary:
      "bg-emerald-900 text-white hover:bg-emerald-800 border border-emerald-900 hover:border-emerald-500",
    secondary:
      "bg-transparent text-white border border-zinc-700 hover:bg-zinc-900 hover:border-zinc-500",
    danger:
      "bg-transparent text-red-800 border border-red-900 hover:bg-red-900 hover:border-red-500 hover:text-white",
  };
  const disabledClasses = disabled
    ? "opacity-50 bg-neutral-700 border-neutral-700 cursor-not-allowed hover:bg-neutral-700 hover:border-neutral-700"
    : "";

  return (
    <button
      onClick={onClick}
      className={joinClasses(
        baseClasses,
        buttonClasses[variant],
        className || "",
        disabledClasses
      )}
    >
      {children}
    </button>
  );
};
