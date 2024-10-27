import { joinClasses } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export const TopicRow = ({ topic }: { topic: string }) => {
  // Constants
  const baseClasses =
    "px-4 py-2 transition-height duration-300 ease-in-out overflow-hidden";
  const hoverClasses = "cursor-pointer hover:bg-zinc-700";

  // Hooks
  const router = useRouter();

  // Methods
  const handleClick = () => {
    router.push("?topic=" + topic);
  };

  return (
    <div
      className={joinClasses(baseClasses, hoverClasses)}
      onClick={handleClick}
    >
      {topic}
    </div>
  );
};
