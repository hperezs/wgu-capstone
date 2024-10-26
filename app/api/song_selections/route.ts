import { getMongoClient } from "@/lib/mongodb/client";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("song-selections");

    const result = await collection.find().toArray();

    return NextResponse.json({ songSelections: result });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  } finally {
    await mongodb_client.close();
  }
}

export async function POST(request: Request) {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("song-selections");

    const record = await request.json();

    await collection.insertOne(record);
    return NextResponse.json({ message: "Song selection created." });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  } finally {
    await mongodb_client.close();
  }
}

export async function PUT(request: Request) {
  const mongodb_client = getMongoClient();
  try {
    await mongodb_client.connect();

    const database = mongodb_client.db("hymn-helper-db");
    const collection = database.collection("song-selections");

    const record = await request.json();

    await collection.updateOne(
      { _id: new ObjectId(record._id) },
      {
        $set: {
          selectionItems: record.selectionItems,
        },
      }
    );

    return NextResponse.json({ message: "Song selection updated." });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  } finally {
    await mongodb_client.close();
  }
}
