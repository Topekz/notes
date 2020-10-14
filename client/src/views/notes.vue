<template>
  <div class="container">
      <h1>Notes</h1>
      <button @click="createNote">New</button>
      <div id="notes">
          <div class="note" v-for="(object,index) in notes" v-bind:key="index" @click="openNote(index)">
              <p>{{ notes[index].name }}</p>
          </div>
      </div>
      <button @click="logout">Log Out</button>
      <button @click="closeAccount">Close account</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "notes",
    data() {
      return {
          user: "",
          notes: []
      }
    },
    methods: {
        getUser: function() {
            axios(process.env.VUE_APP_SERVER + "/user", {
                method: "get",
                withCredentials: true
            }).then(response => {
                console.log(response.data[0]);
                this.user = response.data[0].username;
            });
            axios(process.env.VUE_APP_SERVER + "/notes", {
                method: "get",
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                this.notes = response.data;
            });
        },
        openNote: function(note) {
            this.$router.push("/notes/" + this.notes[note]._id);
        },
        createNote: function() {
            let noteName = "test2"
            axios(process.env.VUE_APP_SERVER + '/create', {
                method: 'post',
                data: {name: noteName},
                withCredentials: true
            }).then(response => {
                console.log(response.data);
            });
        },
        logout: function() {
            axios(process.env.VUE_APP_SERVER + '/logout', {
                method: 'post',
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                window.location.replace("/");
            });
        },
        closeAccount: function() {
            axios(process.env.VUE_APP_SERVER + '/close', {
                method: 'post',
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                this.logout();
                window.location.replace("/");
            });
        }
    },
    mounted() {
        if(this.$cookie.get('loggedin') == "true") {
            this.getUser();
        } else {
            window.location.replace("/login");
        }
    }
}
</script>

<style scoped>

</style>