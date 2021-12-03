// CRUD - create read update delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// do not use localhost, or else expect unpredicted behavior
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  /* by default the old URL parser is deprecated,
   the new one should be called explicitly */
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.error("Unable to connect to the database!");

    const db = client.db(databaseName);

    db.collection("users").insertOne(
      {
        name: "Ivan",
        age: "24"
      },
      (err, result) => {
        if (err) return console.error("Unable to insert user: ", err);

        console.log(result.insertedId);
      }
    );
  }
);
