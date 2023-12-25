// pages/api/storePrompt.js

// import { MongoClient } from 'mongodb';
import connect from "@/utils/db";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        await handlePost(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handlePost(req, res) {
    try {
        const { prompt } = req.body;

        // Connect to MongoDB
        // const client = await MongoClient.connect(process.env.MONGODB_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        // const db = client.db();
await connect();
        // Store prompt in MongoDB
        const collection = db.collection('prompts');
        const result = await collection.insertOne({ prompt });

        client.close();

        res.status(201).json({ message: 'Prompt stored successfully', result });
    } catch (error) {
        console.error('Error storing prompt:', error);
        res.status(500).json({ message: 'Error storing prompt' });
    }
}
