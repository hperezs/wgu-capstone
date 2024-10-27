import { getMongoClient } from "@/lib/mongodb/client";
import { Sort } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("songs");

    // Get search param from URL
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const sortBy = url.searchParams.get("sort");
    const tag = url.searchParams.get("topic");

    const tagQuery = tag ? { tags: { $in: [tag] } } : {};
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
    const query = { ...tagQuery, ...searchQuery };
    const sort: Sort =
      sortBy === "alphabetical" ? { title: 1 } : { songNumber: 1 };

    const result = await collection
      .find(query)
      .collation({ locale: "en_US", numericOrdering: true })
      .sort(sort)
      .toArray();

    return NextResponse.json({ songs: result });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  } finally {
    await mongodb_client.close();
  }
}
