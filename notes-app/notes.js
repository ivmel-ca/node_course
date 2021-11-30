const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

debugger;

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = (title, description) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      description
    });

    saveNotes(notes);
    console.log(chalk.green("new note is added"));
  } else {
    console.log(chalk.red("Note title taken"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red(`no such note with a title: "${title}"`));
  } else {
    console.log(chalk.green("removing the note..."));
    saveNotes(filteredNotes);
  }
};

const getNotesList = () => {
  const notes = loadNotes();

  if (!notes.length) return console.log(chalk.red("no notes yet..."));
  notes.forEach((note, index) =>
    index % 2 !== 0
      ? console.log(chalk.blue(note.title))
      : console.log(chalk.yellow(note.title))
  );
};

const readNote = (title) => {
  const notes = loadNotes();

  const requestedNote = notes.find((note) => note.title === title);

  requestedNote
    ? console.log(
        chalk.green(`Your note:
    ${requestedNote.title}
    ---
    ${requestedNote.description}
  `)
      )
    : console.log(chalk.red("no such note has been found..."));
};

module.exports = {
  addNote,
  removeNote,
  getNotesList,
  readNote
};
