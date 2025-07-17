import "dotenv/config"
import client, { connectToMongo } from "./lib/db.js"
import { ObjectId } from "mongodb"

await connectToMongo();

const riddelsCollection = client.db('arava').collection('riddels');

export async function getAll() {
    try {
        const res = await riddelsCollection.find().toArray();
        return res;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function insertData(body) {
    try {
        const res = await riddelsCollection.insertOne(body)
        return res.insertedId;
    } catch (err) {
        console.log("Error with inserting data: ", err.message)
    }
}
