<template>
  <div class="container">
        <div id="notebooks">
            <p>Notebooks</p>
            <hr>
            <div id="notebookGrid">
                <div id="newNotebook" @click="createNotebook">
                    <FolderPlusIcon class="notebookIcon" size="30"/>
                    <p>New Notebook</p>
                </div>
                <div class="notebook" v-for="(object,index) in notebooks" v-bind:key="index" @click="openNotebook(index)">
                    <FolderIcon class="notebookIcon" size="30"/>
                    <p>{{ notebooks[index].name }}</p>
                    <div class="more" @click="moreNotebook(index)" @click.stop>
                        <MoreVerticalIcon class="moreIcon" size="18"/>
                    </div>
                </div>
            </div>
        </div>
        <button @click="logout">Log Out</button>
        <button @click="closeAccount">Close account</button>
  </div>
</template>

<script>
import axios from 'axios';
import { FolderIcon, FolderPlusIcon, MoreVerticalIcon } from 'vue-feather-icons'

export default {
    name: "notes",
    components: {
        FolderIcon, FolderPlusIcon, MoreVerticalIcon
    },
    data() {
      return {
          user: "",
          notebooks: []
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
        getNotebooks: function() {
            axios(process.env.VUE_APP_SERVER + "/notebooks", {
                method: "get",
                withCredentials: true
            }).then(response => {
                this.notebooks = response.data;
            });
        },
        openNotebook: function(notebook) {
            this.$router.push("/notebook/" + this.notebooks[notebook]._id);
        },
        createNotebook: async function() {
            let notebookName = "Notebook #" + (this.notebooks.length+1);
            await axios(process.env.VUE_APP_SERVER + '/createnotebook', {
                method: 'post',
                data: {name: notebookName},
                withCredentials: true
            });
            this.getNotebooks();
        },
        moreNotebook: function(notebook) {
            console.log(notebook);
            this.removeNotebook(notebook);
        },
        removeNotebook: async function(notebook) {
            if(confirm("Permanently remove this notebook?")) {
                await axios(process.env.VUE_APP_SERVER + "/removenotebook", {
                    method: "post",
                    data: {id: this.notebooks[notebook]._id},
                    withCredentials: true
                });
                this.getNotebooks();
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
            this.getUser();
            this.getNotebooks();
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