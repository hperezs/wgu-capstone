import { Spinner } from "@/lib/components/Spinner";
import { TopicRow } from "@/lib/components/TopicsList/TopicRow";
import { groupAlphabetically } from "@/lib/helpers";
import { useTopics } from "@/lib/hooks/useTopics";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";

export const TopicsList = () => {
  // Hooks
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const debouncedSearch = useDebounce(search, 500);

  // Data Fetching
  const { data: topicsData, isFetching: isFetchingTopics } =
    useTopics(debouncedSearch);
  const topics = topicsData?.topics ?? [];
  const groupedTopics = groupAlphabetically(topics);

  return (
    <>
      <Spinner loading={isFetchingTopics} />
      <div className="w-[850px] h-[725px] rounded border border-zinc-500 overflow-y-scroll">
        {Object.entries(groupedTopics).map(([letter, topics]) => (
          <div key={letter}>
            <h2 className="text-xl font-bold border-y border-zinc-700 p-2 px-4">
              {letter}
            </h2>
            <div className="px-4 py-2">
              {topics.map((topic) => (
                <TopicRow topic={topic} key={topic} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
