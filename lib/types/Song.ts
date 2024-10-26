export interface Song {
  title: string;
  songNumber: string;
  tags: string[];
  _id: string;
}

export type SortBy = "number" | "alphabetical";
