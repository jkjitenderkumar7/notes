<template>
  <div>
    <h1>{{ title }}</h1>

    <p class="actions">
      <router-link class="back" to="/"><button><< Back</button></router-link>
      <button v-bind:class="{ 'inactive': !changed }" v-on:click="save" class="save">Save</button>
      <button v-bind:class="{ 'inactive': !noteContent }" v-on:click="remove" class="delete">Delete</button>
    </p>

    <textarea v-model="noteContent" v-on:keyup="changed = true;"></textarea>

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
        /* Id of the note */
        id: 0,
        /* Dynamic title to use this component for create/edit/details pages */
        title: 'Add New Note',
        /* Flag to keep track if the note text has been changed */
        changed: false
      }
    },
    created: function () {
      /** Id is -
       - either taken from route (existing note - edit/view mode),
       - or, Taken as the length of note list (new note - create mode)
      */
      if (this.$route.params.id != undefined) {
        this.id = this.$route.params.id;
      } else {
        this.id = notesService.getNotes().length;
      }
      /* If an id is present in router, we fetch note content for that id using service*/
      if (this.$route.params.id != undefined) {
        this.noteContent = notesService.getNote(this.id);
        this.title = `Note #${this.id + 1}`;
      }
    },
    methods: {
      /* Save the note in list using service */
      save: function () {
        if (this.noteContent) {
          notesService.updateNotes(this.noteContent, this.id);
          this.changed = false;
        }
      },
      /* Delete the note from list, return to home page */
      remove: function () {
        this.noteContent = '';
        notesService.deleteNote(this.id);
        if (this.$route.params.id != undefined) {
          this.$router.push({ name: 'home'});
        }
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
