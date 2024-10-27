import songService from "@/lib/services/song.service";
import { SortBy } from "@/lib/types/Song";
import { useQuery } from "@tanstack/react-query";

export const useSongs = (search: string, sortBy: SortBy, topic: string) => {
  return useQuery({
    queryKey: ["songs", search, sortBy, topic],
    queryFn: () => songService.get({ search, sortBy, topic }),
    placeholderData: (prev) => prev ?? { songs: [] },
    staleTime: 100000,
  });
};
