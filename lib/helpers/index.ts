import { Song } from "@/lib/types/Song";
import {
  SongOrderChoice,
  SongSelection,
  SongSelectionItem,
} from "@/lib/types/SongSelection";

export const joinClasses = (...classes: string[]): string => {
  return classes.join(" ");
};

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sortSongsAlphabetically = (songs: Song[]) => {
  return songs.reduce((acc, song) => {
    const firstLetter = song.title[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(song);
    return acc;
  }, {} as Record<string, Song[]>);
};

export const groupAlphabetically = (strings: string[]) => {
  return strings.reduce((acc, string) => {
    const firstLetter = string[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(string);
    return acc;
  }, {} as Record<string, string[]>);
};

export const getNextSunday = () => {
  const today = new Date();
  const daysUntilSunday = 7 - today.getDay();
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  return nextSunday;
};

export const titleCaseString = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const sameDay = (date1: Date | string, date2: Date | string) => {
  if (typeof date1 === "string") {
    date1 = new Date(date1);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const orderSongSelectionItems = (items: SongSelectionItem[]) => {
  const orderMap = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };

  return items.sort((a, b) => orderMap[a.songOrder] - orderMap[b.songOrder]);
};

export function songSelectionsToCSV(selections: SongSelection[]): string {
  // If no selections, return empty string
  if (!selections.length) {
    return "";
  }

  // Create header row
  const headers = [
    "Selection Date",
    "First Song",
    "Second Song",
    "Third Song",
    "Fourth Song",
  ];
  const headerRow = headers.join(",");

  // Process each selection into a row
  const rows = selections.map((selection) => {
    // Create an object to store songs by their order
    const songsByOrder: Record<SongOrderChoice, string> = {
      first: "",
      second: "",
      third: "",
      fourth: "",
    };

    // Populate the songsByOrder object
    selection.selectionItems.forEach((item) => {
      songsByOrder[item.songOrder] = item.songNumber;
    });

    // Format the date
    const formattedDate = selection.selectionDate.toISOString().split("T")[0];

    // Create the row with values in the correct order
    const rowValues = [
      formattedDate,
      songsByOrder.first,
      songsByOrder.second,
      songsByOrder.third,
      songsByOrder.fourth,
    ];

    return rowValues.join(",");
  });

  // Combine header and data rows
  return [headerRow, ...rows].join("\n");
}
