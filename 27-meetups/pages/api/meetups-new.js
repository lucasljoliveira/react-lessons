import { MongoClient } from 'mongodb'

export default async function Handler(req, res){
    const method = req.method;

    if (method !== "POST") {
        return
    }

    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://<username>:<password>@next-app-test.llta7.mongodb.net/?retryWrites=true&w=majority&appName=next-app-test")

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: "Meetup inserted", data: result});
}