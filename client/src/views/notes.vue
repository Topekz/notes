<template>
  <div class="container">
        <FilePlusIcon id="createNote" size="40" @click="createNote"/>
        <div id="folders">
            <p>Folders</p>
            <hr>
            <div id="foldersGrid">
                <div id="newFolder" @click="createFolder">
                    <FolderPlusIcon class="folderIcon" size="30"/>
                    <p>New folder</p>
                </div>
                <div class="folder" v-for="(object,index) in folders" v-bind:key="index" @click="openFolder(index)">
                    <FolderIcon class="folderIcon" size="30"/>
                    <p>{{ folders[index].name }}</p>
                    <div class="more" @click="moreFolder(index)" @click.stop>
                        <MoreVerticalIcon class="moreIcon" size="18"/>
                    </div>
                </div>
            </div>
        </div>
        <div id="notes">
            <p>Notes</p>
            <hr>
            <div id="notesGrid">
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
        <button @click="logout">Log Out</button>
        <button @click="closeAccount">Close account</button>
  </div>
</template>

<script>
import axios from 'axios';
import { FilePlusIcon, FileTextIcon, FolderIcon, FolderPlusIcon, MoreVerticalIcon } from 'vue-feather-icons'

export default {
    name: "notes",
    components: {
        FilePlusIcon, FileTextIcon, FolderIcon, FolderPlusIcon, MoreVerticalIcon
    },
    data() {
      return {
          user: "",
          notes: [],
          folders: []
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
        getFolders: function() {
            axios(process.env.VUE_APP_SERVER + "/folders", {
                method: "get",
                withCredentials: true
            }).then(response => {
                this.folders = response.data;
            });
        },
        openFolder: function(folder) {
            this.$router.push("/notes/folder/" + this.folders[folder]._id);
        },
        openNote: function(note) {
            this.$router.push("/notes/" + this.notes[note]._id);
        },
        createFolder: async function() {
            let folderName = "Folder #" + (this.folders.length+1);
            await axios(process.env.VUE_APP_SERVER + '/createfolder', {
                method: 'post',
                data: {name: folderName},
                withCredentials: true
            });
            this.getFolders();
        },
        createNote: function() {
            let noteName = "Note #" + (this.notes.length+1);
            axios(process.env.VUE_APP_SERVER + '/createnote', {
                method: 'post',
                data: {name: noteName},
                withCredentials: true
            }).then(response => {
                this.$router.push("/notes/" + response.data.id);
            });
        },
        moreFolder: function(folder) {
            console.log(folder);
            this.removeFolder(folder);
        },
        moreNote: function(note) {
            console.log(note);
            this.removeNote(note);
        },
        removeFolder: async function(folder) {
            if(confirm("Permanently remove this folder?")) {
                await axios(process.env.VUE_APP_SERVER + "/removefolder", {
                    method: "post",
                    data: {id: this.folders[folder]._id},
                    withCredentials: true
                });
                this.getFolders();
            }
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
        closeAccount: function() {
            axios(process.env.VUE_APP_SERVER + '/close', {
                method: 'post',
                withCredentials: true
            }).then(function() {
                this.logout();
                window.location.replace("/");
            });
        }
    },
    mounted() {
        if(this.$cookie.get('loggedin') == "true") {
            this.getUser();
            this.getNotes();
            this.getFolders();
        } else {
            window.location.replace("/login");
        }
    }
}
</script>

<style scoped>
.container {
    margin: 80px;
}
#createNote {
    background-color: rgb(75, 117, 255);
    color: white;
    padding: 30px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s;
}
#createNote:hover {
    transform: scale(1.05);
}

#folders {
    margin: 30px 0 0 0;
    max-width: 900px;
    min-width: 450px;
}
#folders hr {
    color: rgb(255, 255, 255);
    margin: -5px 0 15px 0;
}
#foldersGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}
#newFolder {
    background-color: rgb(75, 117, 255);
    border: 2px solid rgb(75, 117, 255);
    height: 55px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;
}
#newFolder .folderIcon {
    color: white;
    margin: 0 0 0 10px;
    position: absolute;
}
#newFolder p {
    color: white;
    font-size: 15px;
    padding: 1px 10px 0 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.folder {
    background-color: #dceaff;
    border: 1px solid rgb(75, 117, 255);
    height: 55px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;
}
.folder .folderIcon {
    color: rgb(75, 117, 255);
    margin: 0 0 0 10px;
    position: absolute;
}
.folder p {
    color: rgb(75, 117, 255);
    font-size: 15px;
    padding: 1px 10px 0 50px;
    margin-right: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#notes {
    margin: 0px 0 0 0;
    max-width: 900px;
    min-width: 450px;
}
#notes hr {
    color: rgb(255, 255, 255);
    margin: -5px 0 15px 0;
}
#notesGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}
#newNote {
    background-color: rgb(75, 117, 255);
    border: 1px solid rgb(75, 117, 255);
    height: 45px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;
}
#newNote .noteIcon {
    color: white;
    margin: 0 0 0 10px;
    position: absolute;
}
#newNote p {
    color: white;
    font-size: 15px;
    padding: 1px 00px 0 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.note {
    background-color: white;
    border: 1px solid rgb(75, 117, 255);
    height: 45px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;
}
.note .noteIcon {
    color: rgb(75, 117, 255);
    margin: 0 0 0 10px;
    position: absolute;
}
.note p {
    color: rgb(75, 117, 255);
    font-size: 15px;
    padding: 1px 10px 0 50px;
    margin-right: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.note:hover .more {
    display: block;
}
.folder:hover .more {
    display: block;
}
.note .more {
    display: none;
    background-color: none;
    padding: 5px 5px 5px 5.5px;
    margin-right: 10px;
    border-radius: 20px;
}
.folder .more {
    display: none;
    background-color: none;
    padding: 5px 5px 5px 5.5px;
    margin-right: 10px;
    border-radius: 20px;
}
.moreIcon {
    margin-bottom: -4px;
    color: rgb(75, 117, 255);
}
.note .more:hover {
    background-color: #dceaff;
}
.folder .more:hover {
    background-color: white;
}
</style>