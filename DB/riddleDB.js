import "dotenv/config"
import client, { connectToMongo } from "../lib/mongodb.js"
import { ObjectId } from "mongodb"


const riddelsCollection = client.db('arava').collection('riddels');

export async function getAll() {
    try {
        await connectToMongo();
        const res = await riddelsCollection.find().toArray();
        return res;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function insertData(body) {
    try {
        await connectToMongo();
        const res = await riddelsCollection.insertOne(body)
        return res.insertedId;
    } catch (err) {
        console.log("Error with inserting data: ", err.message)
    }
}

export async function getRiddlesByLevelDal(level) {
    try {
        await connectToMongo();
        const res = await riddelsCollection.find({ difficulty: level }).toArray();
        return res;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function updateByIdDal(id, newData) {
    try {
        await connectToMongo();
        const res = await riddelsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: newData }
        );
        return res;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function deleteByIdDal(id) {
    try {
        await connectToMongo();
        const res = await riddelsCollection.deleteOne(
            { _id: new ObjectId(id) }
        );
        return res.acknowledged && res.deletedCount > 0;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}