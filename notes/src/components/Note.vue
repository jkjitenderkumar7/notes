<template>
  <div>
    <h1>{{ title }}</h1>

    <p class="actions">
      <router-link class="back" to="/"><button><< Back</button></router-link>
      <button v-bind:class="{ 'inactive': !changedSinceLast() }" v-on:click="save()" class="save">Save</button>
      <button v-bind:class="{ 'inactive': !noteContent }" v-on:click="remove()" class="delete">Delete</button>
    </p>

    <textarea v-model="noteContent"></textarea>

  </div>
</template>
<script>

  /* Service class to manipulate the notes data in session storage */
  import NotesService from '../service/notes.service';
  const notesService = new NotesService();

  export default{
    name:'Note',
    data () {
      return {
        /* Variable to store text data of a note */
        noteContent: '',
        /* Variable to keep a copy of note data for comparison purpose */
        prevContent: '',
        /* Id of the note (if coming from home page to view the note details), 0 otherwise */
        id: this.$route.params.id || 0,
        /* Dynamic title to use this component for create/edit/details pages */
        title: 'Add New Note'
      }
    },
    created: function () {
      /* If an id is present in router, we fetch note content for that id using service*/
      if (this.id > 0) {
        this.noteContent = notesService.getNote(this.id);
        this.prevContent = this.noteContent;

        this.title = `Note Id: ${this.id}`;
      }
    },
    methods: {
      /* To save a note to our list. Used in edit and create cases */
      save: function () {
        if (this.noteContent && this.changedSinceLast()) {
          this.prevContent = this.noteContent;
          this.id = notesService.updateNotes(this.noteContent, this.id);
        }
      },
      /* Delete the note from list, return to home page */
      remove: function () {
        this.noteContent = '';
        if (this.id > 0) {
          notesService.deleteNote(this.id);
          this.$router.push({ name: 'home'});
        }
      },
      /* Check if note text has changes since the last time it was saved (Not checking for just input change) */
      changedSinceLast: function () {
        return this.prevContent != this.noteContent;
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
  textarea {
    outline: none;
    resize: none;
    background-color: #dbe2be;
    border: none;
    border-radius: 5px;
    width: 400px;
    height: 200px;
    font-size: 14px;
    font-weight: 500;
    word-spacing: 3px;
    padding: 20px;
  }
  .actions *{
    position: relative;
  }
  button {
    font-size: 14px;
    border: none;
    background: #dbe2be;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    outline: none;
  }
  .back {
    right: 120px;
    color: black;
  }
  .save {
    color: #42b983;
  }
  .delete {
    left: 120px;
    color: red;
  }
  /* Class to style inactive buttons */
  .inactive {
    color: black;
    cursor: not-allowed;
    opacity: 0.2;
    text-decoration: none;
  }
</style>
