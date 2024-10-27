import { SongRow } from "@/lib/components/SongList/SongRow";
import { Spinner } from "@/lib/components/Spinner";
import { sortSongsAlphabetically, sameDay } from "@/lib/helpers";
import { useSongs } from "@/lib/hooks/useSongs";
import { useSongSelections } from "@/lib/hooks/useSongSelections";
import { songSelectionService } from "@/lib/services/songSelection.service";
import { Song, SortBy } from "@/lib/types/Song";
import { SongOrderChoice, SongSelection } from "@/lib/types/SongSelection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const SongList: React.FC = () => {
  // Hooks
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sortBy = (searchParams.get("sort") ?? "number") as SortBy;
  const topic = searchParams.get("topic") ?? "";
  const debouncedSearch = useDebounce(search, 500);

  //  ** Data Fetching **
  const queryClient = useQueryClient();
  // Songs
  const { data, isFetching } = useSongs(debouncedSearch, sortBy, topic);
  const songs = data?.songs ?? [];
  const groupedSongs = sortSongsAlphabetically(songs);
  // Song Selections
  const { data: songSelectionsData, isFetching: isFetchingSongSelections } =
    useSongSelections();
  const songSelections = songSelectionsData?.songSelections ?? [];
  const recentlySelectedSongNumbers = songSelections.flatMap((selection) =>
    selection.selectionItems.map((item) => item.songNumber)
  );

  // Mutations
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["songSelections"] });
  };
  const createMutation = useMutation({
    mutationFn: (songSelection: Omit<SongSelection, "_id">) =>
      songSelectionService.create(songSelection),
    onSuccess,
  });
  const updateMutation = useMutation({
    mutationFn: (songSelection: SongSelection) =>
      songSelectionService.update(songSelection),
    mutationKey: ["songSelections"],
    onSuccess,
  });

  // Local State
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  // Methods
  const cancelSelection = () => setSelectedSongId(null);
  const saveSelection = (
    songNumber: string,
    selectionDate: Date,
    songOrder: SongOrderChoice
  ) => {
    // Find existing selection
    const selection = songSelections.find((selection) =>
      sameDay(selection.selectionDate, selectionDate)
    );

    // Update or create new selection
    if (selection) {
      let newSelectionItems = [...selection.selectionItems];
      // Delete all items with the same song number
      newSelectionItems = newSelectionItems.filter(
        (item) => item.songNumber !== songNumber
      );
      // Find the item with the same song order
      const existingItem = selection.selectionItems.find(
        (item) => item.songOrder === songOrder
      );
      // If it exists, update the song number
      if (existingItem) {
        existingItem.songNumber = songNumber;
      } else {
        // Add new item
        newSelectionItems.push({ songNumber, songOrder });
      }

      updateMutation.mutate({
        ...selection,
        selectionItems: newSelectionItems,
      });
    } else {
      createMutation.mutate({
        selectionDate,
        selectionItems: [
          {
            songNumber,
            songOrder,
          },
        ],
      });
    }

    // Reset
    setSelectedSongId(null);
  };
  const renderSong = (song: Song) => {
    const relatedSelections = songSelections.filter((selection) =>
      selection.selectionItems.some(
        (item) => item.songNumber === song.songNumber
      )
    );
    return (
      <SongRow
        key={song._id}
        song={song}
        select={setSelectedSongId}
        isSelected={selectedSongId === song._id}
        save={saveSelection}
        cancel={cancelSelection}
        recentlySelected={recentlySelectedSongNumbers.includes(song.songNumber)}
        relatedSelections={relatedSelections}
      />
    );
  };

  return (
    <div className="w-[850px] h-[725px] rounded border border-zinc-500 overflow-y-scroll">
      {sortBy === "number"
        ? songs.map((song) => renderSong(song))
        : Object.entries(groupedSongs).map(([letter, songs]) => (
            <div key={letter}>
              <h2 className="text-xl font-bold border-y border-zinc-700 p-2 px-4">
                {letter}
              </h2>
              <div className="px-4 py-2">
                {songs.map((song) => renderSong(song))}
              </div>
            </div>
          ))}

      <Spinner
        loading={
          isFetching ||
          isFetchingSongSelections ||
          createMutation.isPending ||
          updateMutation.isPending
        }
      />
    </div>
  );
};
