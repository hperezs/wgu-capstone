"use client";
import { NavBar } from "@/lib/components/NavBar";
import { SearchBar } from "@/lib/components/SearchBar";
import { SongList } from "@/lib/components/SongList";
import { SortOrderControl } from "@/lib/components/SortOrderControl";

export default function Page() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <NavBar />
      <div className="w-full max-h-[screen - 64px] overflow-auto h-full flex justify-center py-10">
        <div className="space-y-9">
          <SearchBar />

          <div className="flex flex-col items-end space-y-3">
            <SortOrderControl />
            <SongList />
          </div>
        </div>
      </div>
    </div>
  );
}
