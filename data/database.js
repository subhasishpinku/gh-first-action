import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables from .env file
config();

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// Construct the URI with the credentials
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://pinkusubhasish:QAl3Y9NbKkbjyX0o@cluster0.lq9sywk.mongodb.net/foodmaster?retryWrites=true&w=majority";
// const uri = "mongodb+srv://pinkusubhasish:QAl3Y9NbKkbjyX0o@cluster0.lq9sywk.mongodb.net/foodmaster?retryWrites=true&w=majority&appName=Project 0";

// Create a new MongoClient
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   appname: 'Project 0',
// });
console.log(`MongoDB connection URI: ${uri}`);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds
  connectTimeoutMS: 10000, // 10 seconds
});

// Function to connect to MongoDB
const connectToDB = async () => {
  console.log('Trying to connect to db');
  try {
    // Connect to the client
    await client.connect();
    // Ping the database to ensure connection
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
  } catch (error) {
    console.error('Connection failed.', error);
    await client.close();
    console.log('Connection closed.');
    return null;
  }
  return client.db(dbName);
};

// Export the connection function to use in other modules
const database = await connectToDB();

export default database;
