import { songSelectionService } from "@/lib/services/songSelection.service";
import { useQuery } from "@tanstack/react-query";

export const useSongSelections = () => {
  return useQuery({
    queryKey: ["songSelections"],
    queryFn: () => songSelectionService.get(),
    placeholderData: (prev) => prev ?? { songSelections: [] },
    staleTime: 100000,
  });
};
