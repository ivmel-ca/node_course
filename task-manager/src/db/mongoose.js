const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const firstUser = new User({
  name: "Max Melnychenko",
  age: 47
});

firstUser
  .save()
  .then((data) => console.log(data))
  .catch((err) => {
    console.error(err);
  });
