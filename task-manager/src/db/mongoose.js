const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be grater than 0");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not contain password!");
      }
    }
  }
});

const firstUser = new User({
  name: "Ivan Melnychenko",
  email: "ivmel.ca@mail.com",
  password: "ute14zE"
});

/* firstUser
  .save()
  .then((data) => console.log(data))
  .catch((err) => {
    console.error(err);
  }); */

const Task = mongoose.model("Task", {
  text: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const errand = new Task({
  text: "buy groceries",
  completed: false
});

errand
  .save()
  .then((data) => console.log(data))
  .catch((err) => {
    console.error(err);
  });
