export interface SongSelection {
  _id: string;
  selectionDate: Date;
  selectionItems: SongSelectionItem[];
}

export interface SongSelectionItem {
  songNumber: string;
  songOrder: SongOrderChoice;
}

export type SongOrderChoice = "first" | "second" | "third" | "fourth";
export const SongOrderOptions = ["first", "second", "third", "fourth"];
