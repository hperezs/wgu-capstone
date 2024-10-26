import songService from "@/lib/services/song.service";
import { Song, SortBy } from "@/lib/types/Song";
import { useQuery } from "@tanstack/react-query";

const fetchSongs = async (
  search: string,
  sortBy: SortBy
): Promise<{ songs: Array<Song> }> => {
  const response = await fetch(`/api/songs?search=${search}&sort=${sortBy}`);
  const data = await response.json();
  return data;
};

const useSongs = (search: string, sortBy: SortBy) => {
  return useQuery({
    queryKey: ["songs", search, sortBy],
    queryFn: () => songService.get({ search, sortBy }),
    placeholderData: (prev) => prev ?? { songs: [] },
    staleTime: 100000,
  });
};

export { useSongs, fetchSongs };
