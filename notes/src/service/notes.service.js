export default class NotesService {

  /**
   * Use sessionStorage api to store the note data. Exposes methods to save/delete/read notes
   */

  init() {
    if (!sessionStorage.getItem('notes')) {
      sessionStorage.setItem('notes', JSON.stringify([]));
    }
  }

  getNote(id) {
    return this.getNotes()[id -1];
  }

  getNotes() {
     return JSON.parse(sessionStorage.getItem("notes")) || [];
  }

  saveNotes(notes) {
    sessionStorage.setItem('notes', JSON.stringify(notes));
  }

  updateNotes(note, id) {
    const notes = this.getNotes();
    if (id > 0) {
      notes[id-1] = note;
    } else {
      notes.push(note);
    }
    this.saveNotes(notes)
    return notes.length;
  }

  deleteNote(id) {
    const notes = this.getNotes();
    notes.splice(id - 1, 1);
    this.saveNotes(notes);
  }

}
