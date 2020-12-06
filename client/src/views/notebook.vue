<template>
  <div class="container">
        <div id="notes">
            <div id="notesList">
                <div id="newNote" @click="createNote">
                    <FilePlusIcon class="noteIcon" size="30"/>
                    <p>New note</p>
                </div>
                <div draggable="true" class="note" v-for="(object,index) in notes" v-bind:key="index" @click="openNote(index)">
                    <FileTextIcon class="noteIcon" size="30"/>
                    <p>{{ notes[index].name }}</p>
                    <div class="more" @click="moreNote(index)" @click.stop>
                        <MoreVerticalIcon class="moreIcon" size="18"/>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FilePlusIcon, FileTextIcon, MoreVerticalIcon } from 'vue-feather-icons';

export default {
    name: "notes",
    components: {
        FilePlusIcon, FileTextIcon, MoreVerticalIcon
    },
    data() {
      return {
          user: "",
          notes: [],
          notebookId: "",
      }
    },
    methods: {
        getUser: function() {
            axios(process.env.VUE_APP_SERVER + "/user", {
                method: "get",
                withCredentials: true
            }).then(response => {
                this.user = response.data[0].username;
            });
        },
        getNotes: function() {
            axios(process.env.VUE_APP_SERVER + "/notes", {
                method: "get",
                withCredentials: true
            }).then(response => {
                this.notes = response.data;
            });
        },
        openNote: function(note) {
            this.$router.push("/notebook/" + this.notebookId + "/" + this.notes[note]._id);
        },
        createNote: function() {
            let noteName = "Note #" + (this.notes.length+1);
            let noteBook = this.notebookId;
            axios(process.env.VUE_APP_SERVER + '/createnote', {
                method: 'post',
                data: {name: noteName, notebook: noteBook},
                withCredentials: true
            }).then(response => {
                console.log(response);
                this.$router.push(this.$route.path + "/" + response.data.id);
            });
        },
        moreNote: function(note) {
            console.log(note);
            this.removeNote(note);
        },
        removeNote: async function(note) {
            if(confirm("Permanently remove this note?")) {
                await axios(process.env.VUE_APP_SERVER + "/removenote", {
                    method: "post",
                    data: {id: this.notes[note]._id},
                    withCredentials: true
                });
                this.getNotes();
            }
        },
        logout: function() {
            axios(process.env.VUE_APP_SERVER + '/logout', {
                method: 'post',
                withCredentials: true
            }).then(function() {
                window.location.replace("/");
            });
        },
        closeAccount: async function() {
            await axios(process.env.VUE_APP_SERVER + '/close', {
                method: 'post',
                withCredentials: true
            });
            this.logout();
            window.location.replace("/");
        }
    },
    mounted() {
        if(this.$cookie.get('loggedin') == "true") {
            this.notebookId = this.$route.params.notebookId;
            this.getUser();
            this.getNotes();
        } else {
            window.location.replace("/login");
        }
    }
}
</script>

<style scoped>
.container {
    margin: 0 0 0 240px;
}
</style>