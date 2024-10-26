import { orderSongSelectionItems, titleCaseString } from "@/lib/helpers";
import { useSongs } from "@/lib/hooks/useSongs";
import { SongSelection } from "@/lib/types/SongSelection";
import { format } from "date-fns";

export interface SongSelectionCardProps {
  songSelection: SongSelection;
}

export const SongSelectionCard: React.FC<SongSelectionCardProps> = ({
  songSelection,
}) => {
  // Data Fetching
  const { data } = useSongs("", "number");
  const songs = data?.songs ?? [];

  return (
    <div className="w-[300px] h-[400px] p-4 border rounded border-zinc-600 bg-zinc-900">
      <div className="text-lg pb-3 border-b border-zinc-600 mb-5">
        {format(songSelection.selectionDate, "MMM do, yyyy")}
      </div>

      <div>
        {orderSongSelectionItems(songSelection.selectionItems).map(
          (selectionItem) => (
            <div className="my-3">
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
  );
};
