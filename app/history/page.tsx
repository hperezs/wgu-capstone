"use client";
import { Button } from "@/lib/components/Button";
import { NavBar } from "@/lib/components/NavBar";
import { ReportsModal } from "@/lib/components/ReportsModal";
import { SongSelectionCard } from "@/lib/components/SongSelectionCard";
import { Spinner } from "@/lib/components/Spinner";
import { useSongs } from "@/lib/hooks/useSongs";
import { useSongSelections } from "@/lib/hooks/useSongSelections";
import { useState } from "react";

export default function Page() {
  // Data Fetching
  const { data: songSelectionsData, isFetching: isFetchingSongSelections } =
    useSongSelections();
  const songSelections = songSelectionsData?.songSelections ?? [];
  const { isFetching: isFetchingSongs } = useSongs("", "number", "");

  // Local State
  const [showReportsModal, setShowReportsModal] = useState(false);

  // Methods

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Spinner loading={isFetchingSongSelections || isFetchingSongs} />
      <ReportsModal
        isOpen={showReportsModal}
        onClose={() => setShowReportsModal(false)}
      />
      <NavBar />
      <div className="w-full max-h-[screen - 64px] overflow-auto h-full flex justify-center py-10">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl tracking-wide font-semibold text-center">
            History
          </h1>

          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setShowReportsModal(true)}
            >
              Generate Report
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {songSelections.map((songSelection) => (
              <SongSelectionCard
                songSelection={songSelection}
                key={songSelection.selectionDate.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
