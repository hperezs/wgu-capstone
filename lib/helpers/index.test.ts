import {
  groupAlphabetically,
  joinClasses,
  sameDay,
  sortSongsAlphabetically,
} from "./index";
import { expect, test } from "vitest";

test("joinClasses joins strings separated by a space", () => {
  expect(joinClasses("a", "b", "c")).toBe("a b c");
});

test("joinClasses ignores empty strings", () => {
  expect(joinClasses("a", "", "b", "", "c")).toBe("a b c");
});

test("sortSongsAlphabetically sorts songs alphabetically", () => {
  const songs = [
    { title: "B" },
    { title: "C" },
    { title: "A" },
    { title: "D" },
  ];
  const sorted = {
    A: [{ title: "A" }],
    B: [{ title: "B" }],
    C: [{ title: "C" }],
    D: [{ title: "D" }],
  };
  expect(sortSongsAlphabetically(songs as any)).toEqual(sorted);
});

test("groupAlphabetically groups strings alphabetically", () => {
  const strings = ["B", "C", "A", "D"];
  const grouped = {
    A: ["A"],
    B: ["B"],
    C: ["C"],
    D: ["D"],
  };
  expect(groupAlphabetically(strings)).toEqual(grouped);
});

test("sameDay returns true when dates are on the same day, month and year", () => {
  const date1 = new Date("2021-01-01");
  const date2 = new Date("2021-01-01");
  expect(sameDay(date1, date2)).toBe(true);
});

test("sameDay returns false when dates are on different days", () => {
  const date1 = new Date("2021-01-01");
  const date2 = new Date("2021-01-02");
  expect(sameDay(date1, date2)).toBe(false);
});
