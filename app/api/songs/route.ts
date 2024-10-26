import { getMongoClient } from "@/lib/mongodb/client";
import { Song } from "@/lib/types/Song";
import { MongoClient, ServerApiVersion, Sort } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("songs");
    const options = { ordered: true };

    // Get search param from URL
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const sortBy = url.searchParams.get("sort");

    const query = search ? { title: { $regex: search, $options: "i" } } : {};
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