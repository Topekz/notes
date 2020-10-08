<template>
  <div id="container">
      <h1>Notes</h1>
      <button @click="createNote">New</button>
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
                this.user = response.data[0].username;
                this.notes = response.data[0].notes;
            });
        },
        openNote: function() {

        },
        createNote: function() {
            let noteName = ""
            axios(process.env.VUE_APP_SERVER + '/create', {
                method: 'post',
                data: {name: noteName},
                withCredentials: true
            }).then(response => {
                console.log(response.data);
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

<style>

</style>