import { Button } from "@/lib/components/Button";
import { DatePicker } from "@/lib/components/DatePicker";
import { Dropdown } from "@/lib/components/Dropdown";
import { getNextSunday, joinClasses, titleCaseString } from "@/lib/helpers";
import { Song } from "@/lib/types/Song";
import {
  SongOrderChoice,
  SongOrderOptions,
  SongSelection,
} from "@/lib/types/SongSelection";
import { format } from "date-fns";
import { useState } from "react";

export interface SongRowProps {
  song: Song;
  isSelected: boolean;
  recentlySelected?: boolean;
  relatedSelections: SongSelection[];
  select: (id: string) => void;
  save: (
    songNumber: string,
    selectionDate: Date,
    songOrder: SongOrderChoice
  ) => void;
  cancel: () => void;
}

export const SongRow: React.FC<SongRowProps> = ({
  song,
  isSelected,
  recentlySelected,
  relatedSelections,
  select,
  save,
  cancel,
}) => {
  // Constants
  const baseClasses =
    "px-4 py-2 transition-height duration-300 ease-in-out overflow-hidden";
  const hoverClasses = !isSelected ? "cursor-pointer hover:bg-zinc-700" : "";
  const selectedClasses = isSelected
    ? `${
        relatedSelections.length > 0
          ? relatedSelections.length > 2
            ? "h-[250px]"
            : "h-[200px]"
          : "h-[170px]"
      } border-y border-zinc-600`
    : "h-[40px]";

  // Hooks

  // Local State
  const [selectionDate, setSelectionDate] = useState<Date>(getNextSunday());
  const [songOrder, setSongOrder] = useState<SongOrderChoice>("first");

  // Methods
  const handleSongClick = () => {
    if (!isSelected) select(song._id);
  };

  const handleSave = () => {
    save(song.songNumber, selectionDate, songOrder);
  };

  return (
    <div
      className={joinClasses(baseClasses, hoverClasses, selectedClasses)}
      onClick={handleSongClick}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[45px] font-semibold tracking-wide">
            {song.songNumber}
          </div>
          <div>{song.title}</div>
        </div>
        {recentlySelected && (
          <div>
            <span className="material-symbols-outlined">history</span>
          </div>
        )}
      </div>

      {isSelected && (
        <div className="flex space-x-5 mt-5 items-center justify-between">
          <div className="flex items-center space-x-4 p-4 border rounder border-zinc-700">
            <div className="flex items-center space-x-3">
              <div>
                <DatePicker
                  value={selectionDate}
                  onChange={(date) => date && setSelectionDate(date)}
                  id={song._id + "date-picker"}
                />
              </div>
              <Dropdown
                value={songOrder}
                onChange={setSongOrder}
                options={SongOrderOptions}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={cancel} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>

          {relatedSelections.length > 0 && (
            <div className="p-4 border rounder border-zinc-600 space-y-2">
              <div className="text-sm">Last Selected</div>

              <div className="space-y-1">
                {relatedSelections?.map((selection) => (
                  <div key={selection.selectionDate.toString()}>
                    {format(new Date(selection.selectionDate), "MMM do, yyyy")}{" "}
                    -{" "}
                    {titleCaseString(
                      selection.selectionItems.find(
                        (i) => i.songNumber === song.songNumber
                      )?.songOrder || ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
