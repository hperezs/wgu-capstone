"use client";
import { joinClasses } from "@/lib/helpers";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar: React.FC<{ modelName?: string }> = ({ modelName }) => {
  // Constants
  const baseInputClasses =
    "w-[500px] h-12 px-5 py-3 border border-zinc-600 rounded-full bg-zinc-900 text-white placeholder-zinc-400";
  const focusClasses = "focus:outline-none focus:border-emerald-800";
  const hoverClasses = "hover:border-zinc-500";
  const transitionClasses = "transition-border duration-200";

  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  // Methods
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    // use router.push with current query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push("?" + params.toString());
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className={joinClasses(
          baseInputClasses,
          focusClasses,
          hoverClasses,
          transitionClasses
        )}
        placeholder={`Search for a ${modelName || "hymn"}...`}
        value={search}
        onChange={onChange}
      />
    </div>
  );
};
