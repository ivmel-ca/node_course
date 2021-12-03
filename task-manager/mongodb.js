// CRUD - create read update delete

const { MongoClient, ObjectId } = require("mongodb");

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

    db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("61a9de37e316928dd5787566")
        },
        {
          $set: {
            age: 22
          }
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));

    db.collection("users")
      .deleteMany({
        age: "24"
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }
);
