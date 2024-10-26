import { Song } from "@/lib/types/Song";
import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  "mongodb+srv://hperezs:DenmeCancion101@hymn-helper.yik27.mongodb.net/?retryWrites=true&w=majority&appName=hymn-helper";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET() {
  const response = await fetch(
    "https://www.churchofjesuschrist.org/media/music/api?type=songsFilteredList&lang=eng&identifier=%7B%22lang%22%3A%22eng%22%2C%22limit%22%3A500%2C%22offset%22%3A0%2C%22orderByKey%22%3A%5B%22bookSongPosition%22%5D%2C%22bookQueryList%22%3A%5B%22hymns%22%5D%7D&batchSize=20"
  );
  const { data } = await response.json();
  const songs: Song[] = data.map((song: Song) => {
    return {
      title: song.title,
      songNumber: song.songNumber,
      tags: song.tags,
    };
  });

  try {
    await client.connect();
    const database = client.db("hymn-helper-db");
    const collection = database.collection("songs");
    const options = { ordered: true };

    const result = await collection.insertMany(songs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }

  return NextResponse.json({ message: "Hello from Next.js!" });
}
