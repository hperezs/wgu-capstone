import { joinClasses } from "@/lib/helpers";
import Link from "next/link";

export interface MainMenuOptionProps {
  text: string;
  href: string;
  icon: string;
}
export const MainMenuOption: React.FC<MainMenuOptionProps> = ({
  text,
  href,
  icon,
}) => {
  const baseContainerClasses =
    "p-10 bg-zinc-900 flex flex-col items-center justify-center space-y-5 w-[250px] h-[200px] rounded border-zinc-700 border";

  const hoverClasses = "hover:bg-zinc-800 hover:border-emerald-900";
  return (
    <Link href={href}>
      <div className={joinClasses(baseContainerClasses, hoverClasses)}>
        <span className="material-symbols-outlined !text-5xl">{icon}</span>
        <div>{text}</div>
      </div>
    </Link>
  );
};
