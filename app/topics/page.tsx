"use client";

import { Button } from "@/lib/components/Button";
import { NavBar } from "@/lib/components/NavBar";
import { SearchBar } from "@/lib/components/SearchBar";
import { SongList } from "@/lib/components/SongList";
import { SortOrderControl } from "@/lib/components/SortOrderControl";
import { TopicsList } from "@/lib/components/TopicsList";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") ?? "";

  // Methods
  const backButtonClick = () => {
    router.push("?topic=");
  };
  return (
    <div className="w-screen h-screen overflow-hidden">
      <NavBar />

      <div className="w-full max-h-[screen - 64px] overflow-auto h-full flex justify-center py-10">
        <div className="space-y-9">
          <SearchBar modelName={topic ? "hymn" : "topic"} />

          {topic ? (
            <div>
              <div className="flex justify-between items-center mb-2 p-2 border rounded border-zinc-600">
                <div className="flex space-x-4 items-center">
                  <Button
                    variant="secondary"
                    onClick={backButtonClick}
                    className="py-1 px-1"
                  >
                    <span className="material-symbols-outlined mt-1">
                      chevron_left
                    </span>
                  </Button>
                  <div>Topic: {topic}</div>
                </div>

                <SortOrderControl />
              </div>
              <SongList />
            </div>
          ) : (
            <TopicsList />
          )}
        </div>
      </div>
    </div>
  );
}
