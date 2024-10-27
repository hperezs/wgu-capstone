import { getMongoClient } from "@/lib/mongodb/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("topics");

    // Get search param from URL
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    // const sortBy = url.searchParams.get("sort");

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const result = await collection.find(query).sort({ name: 1 }).toArray();
    const topics = result.map((topic) => topic.name);

    return NextResponse.json({ topics });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  } finally {
    await mongodb_client.close();
  }
}

// Keeping this for reference.
// Gets topics from songs
// export async function GET(request: Request) {
//   const mongodb_client = getMongoClient();
//   try {
//     await mongodb_client.connect();

//     const database = mongodb_client.db("hymn-helper-db");
//     const collection = database.collection("songs");

//     const result = await collection
//       .find()
//       .collation({ locale: "en_US", numericOrdering: true })
//       .sort({ title: 1 })
//       .toArray();

//     const topics = result.map((song) => song.tags).flat();
//     // Filter out duplicates
//     const set = new Set(topics);
//     const uniqueTopics = Array.from(set);

//     const result2 = await database
//       .collection("topics")
//       .insertMany(uniqueTopics.map((topic) => ({ name: topic })));

//     return NextResponse.json({ result2 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.error();
//   } finally {
//     await mongodb_client.close();
//   }
// }
