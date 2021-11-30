const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      type: "string"
    },
    description: {
      describe: "Note description",
      type: "string"
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.description);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a new note",
  builder: {
    title: {
      describe: "Note title",
      type: "string"
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler: () => {
    notes.getNotesList();
  }
});

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "note title",
      type: "string"
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  }
});

yargs.parse();
