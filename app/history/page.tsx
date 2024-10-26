"use client";
import { NavBar } from "@/lib/components/NavBar";
import { SongSelectionCard } from "@/lib/components/SongSelectionCard";
import { Spinner } from "@/lib/components/Spinner";
import { useSongs } from "@/lib/hooks/useSongs";
import { useSongSelections } from "@/lib/hooks/useSongSelections";

export default function Page() {
  // Data Fetching
  const { data: songSelectionsData, isFetching: isFetchingSongSelections } =
    useSongSelections();
  const songSelections = songSelectionsData?.songSelections ?? [];
  const { isFetching: isFetchingSongs } = useSongs("", "number");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Spinner loading={isFetchingSongSelections || isFetchingSongs} />
      <NavBar />
      <div className="w-full max-h-[screen - 64px] overflow-auto h-full flex justify-center py-10">
        <div className="flex flex-col space-y-5">
          <h1 className="text-3xl tracking-wide font-semibold text-center">
            History
          </h1>

          <div className="grid grid-cols-4 gap-6">
            {songSelections.map((songSelection) => (
              <SongSelectionCard songSelection={songSelection} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
