"use client";
import { MainMenuOption } from "@/lib/components/MainMenuOption";
import { NavBar } from "@/lib/components/NavBar";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex space-x-10">
          <MainMenuOption text="Search" href="search" icon="search" />
          <MainMenuOption text="Filter by Topic" href="topics" icon="filter" />
          <MainMenuOption
            text="See Previous Choices"
            href="history"
            icon="history"
          />
        </div>
      </div>
    </div>
  );
}
