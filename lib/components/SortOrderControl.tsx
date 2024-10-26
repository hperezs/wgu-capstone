"use client";
import { joinClasses } from "@/lib/helpers";
import { useRouter, useSearchParams } from "next/navigation";

export const SortOrderControl: React.FC = () => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Methods
  const handleSort = (sortBy: "alphabetical" | "number") => {
    // Add to query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortBy);

    router.push("?" + params.toString());
  };

  // Constants
  const baseClasses = "p-2 pb-1 border border-1 border-zinc-500";
  const hoverClasses = "hover:border-emerald-400 hover:bg-zinc-700";

  return (
    <div className="flex mb-3">
      <button
        onClick={() => handleSort("alphabetical")}
        className={joinClasses(baseClasses, hoverClasses, "rounded-l")}
      >
        <span className="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button
        onClick={() => handleSort("number")}
        className={joinClasses(
          baseClasses,
          hoverClasses,
          "border-l-0 rounded-r rounded-l-none hover:border-l"
        )}
      >
        <span className="material-symbols-outlined">tag</span>
      </button>
    </div>
  );
};
