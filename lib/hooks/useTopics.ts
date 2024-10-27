import { useQuery } from "@tanstack/react-query";

const fetchTopics = async (search: string): Promise<{ topics: string[] }> => {
  const response = await fetch(`/api/topics?search=${search}`);
  const data = await response.json();
  return data;
};

export const useTopics = (search: string) => {
  return useQuery({
    queryKey: ["topics", search],
    queryFn: () => fetchTopics(search),
    placeholderData: (prev) => prev ?? { topics: [] },
    staleTime: 100000,
  });
};
