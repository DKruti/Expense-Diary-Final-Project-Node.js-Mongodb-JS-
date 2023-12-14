import { MongoClient } from "mongodb"
// the URI is from your cluster mongodb wensite link which we used to set up the compass as well
const mongoURI = 'mongodb+srv://kdhyani7158:8DFnW2gZ2CvLakWy@cluster0.10vmseh.mongodb.net/SFBU'

let myDatabase;
export const connectToDatabase = async()=>{
    try{
        const client = new MongoClient(mongoURI)
        await client.connect()
        myDatabase = client.db()
        console.log('connected to the mongoDB database:')
    }
    catch(error){
        console.error('failed to connect to MongoDB',error)
    }
}
export function getDatabaseClient(){
    return myDatabase
}