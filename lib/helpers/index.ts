import { Song } from "@/lib/types/Song";
import { SongSelectionItem } from "@/lib/types/SongSelection";

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

export const groupAlphabetically = (songs: Song[]) => {
  return songs.reduce((acc, song) => {
    const firstLetter = song.title[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(song);
    return acc;
  }, {} as Record<string, Song[]>);
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
