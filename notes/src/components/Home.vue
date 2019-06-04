<template>
  <div>
    <h1>Your Notes</h1>

    <router-link to="/add"><button>Add New Note</button></router-link>

    <div>
      <ol>
        <li v-for="(note, index) in notes"><p @click="navigateToDetail(index)">{{ note }}</p><span>x</span></li>
    </ol>
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
        const id = index + 1;
        this.$router.push({ name: 'view', params: { id: id } });
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
  ol {
    width: 300px;
    margin: 10px auto;
    border-top: 1px solid #42b983;
  }
  li {
    text-align: left;
    color: black;
  }
  li:hover {
    color: #42b983;
  }
</style>
