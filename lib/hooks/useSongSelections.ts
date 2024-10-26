import songService from "@/lib/services/song.service";
import { songSelectionService } from "@/lib/services/songSelection.service";
import { Song, SortBy } from "@/lib/types/Song";
import { useQuery } from "@tanstack/react-query";

export const useSongSelections = () => {
  return useQuery({
    queryKey: ["songSelections"],
    queryFn: () => songSelectionService.get(),
    placeholderData: (prev) => prev ?? { songSelections: [] },
    staleTime: 100000,
  });
};
