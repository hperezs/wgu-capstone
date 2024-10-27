"use client";
import { Button } from "@/lib/components/Button";
import { Spinner } from "@/lib/components/Spinner";
import { orderSongSelectionItems, titleCaseString } from "@/lib/helpers";
import { useSongs } from "@/lib/hooks/useSongs";
import { songSelectionService } from "@/lib/services/songSelection.service";
import { SongSelection } from "@/lib/types/SongSelection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export interface SongSelectionCardProps {
  songSelection: SongSelection;
}

export const SongSelectionCard: React.FC<SongSelectionCardProps> = ({
  songSelection,
}) => {
  // Data Fetching
  const queryClient = useQueryClient();
  const { data } = useSongs("", "number", "");
  const songs = data?.songs ?? [];
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["songSelections"] });
  };
  const deleteMutation = useMutation({
    mutationFn: (recordId: string) => songSelectionService.delete(recordId),
    onSuccess,
  });

  // Methods
  const deleteSelection = () => {
    deleteMutation.mutate(songSelection._id);
  };

  return (
    <>
      <Spinner loading={deleteMutation.isPending} />
      <div className="w-[300px] h-[400px] p-4 border rounded border-zinc-600 bg-zinc-900">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-600 mb-5">
          <div className="text-lg ">
            {format(songSelection.selectionDate, "MMM do, yyyy")}
          </div>
          <Button
            variant="danger"
            onClick={deleteSelection}
            className="px-1 py-1"
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </div>

        <div>
          {orderSongSelectionItems(songSelection.selectionItems).map(
            (selectionItem) => (
              <div
                className="my-3"
                key={selectionItem.songNumber + selectionItem.songOrder}
              >
                <div>{titleCaseString(selectionItem.songOrder)}</div>
                <div className="text-lg">
                  #{selectionItem.songNumber}{" "}
                  {
                    songs.find((s) => s.songNumber === selectionItem.songNumber)
                      ?.title
                  }
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
