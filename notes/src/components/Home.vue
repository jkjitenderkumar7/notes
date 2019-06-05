<template>
  <div>
    <h1>Your Notes</h1>

    <router-link to="/add"><button>Add New Note</button></router-link>

    <div>
      <ul>
        <li v-for="(note, index) in notes">
          <p class="note-link" @click="navigateToDetail(index)">{{ index + 1}}. {{ note }}</p>
          <span class="delete-btn" @click="deleteNote(index)">x</span>
        </li>
    </ul>
    </div>
  </div>
</template>

<script>

  /* Service class to manipulate the notes data in session storage */
  import NotesService from '../service/notes.service';
  const notesService = new NotesService();

  /* Initialize notesService*/
  notesService.init();

  export default {
    name: 'Home',
    data() {
      return {
        notes: notesService.getNotes()
      }
    },
    methods: {
      /* Navigate to specific note details using parameterized routes */
      navigateToDetail: function (index) {
        const id = index;
        this.$router.push({ name: 'view', params: { id: id } });
      },
      deleteNote: function (index) {
         notesService.deleteNote(index);
         this.notes = notesService.getNotes();
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
  button {
    font-size: 14px;
    border: none;
    background: #dbe2be;
    padding: 10px;
    border-radius: 5px;
    color: #42b983;
    font-weight: bold;
    outline: none;
  }
  ul {
    width: 300px;
    margin: 10px auto;
    border-top: 1px solid #42b983;
    list-style-type: none;
    padding: 20px 0;
    margin: 20px auto;
  }
  ul li {
    text-align: left;
    color: black;
    border: 1px solid #DBE222;
    margin-top: -1px;
    background-color: #DBE2E2;
    padding: 5px;
    font-size: 14px;
    position: relative;
  }
  ul li:hover {
    background-color: #dbe2be;
  }
  .note-link {
    max-height: 40px;
    overflow: hidden;
  }
  .note-link:hover {
    color: #42b983;
    cursor: pointer;
  }
  .delete-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
    font-weight: bold;
  }
  .delete-btn:hover {
    color: red;
  }
</style>
