<template>
    <div class="container">
        <!-- <input type="text" v-model="noteName" id="title">
        <button id="saveBtn" v-on:click="save" v-if="(noteContent != lastSave) || (noteName != lastName)" @mousedown="handleBtn">Save</button>
        <button id="savedBtn" v-on:click="save" v-if="(noteContent == lastSave) && (noteName == lastName)" @mousedown="handleBtn">Saved</button>
        <p id="removeBtn" v-on:click="remove">Delete note</p> -->
        <div class="toolbar">
            <abbr style="text-decoration: none;" title="Bold"><button class="toolbarBtn" id="boldBtn" @click="bold" @mousedown="handleBtn"><b>B</b></button></abbr>
            <abbr style="text-decoration: none;" title="Italic"><button class="toolbarBtn" id="italicBtn" @click="italic" @mousedown="handleBtn"><b><i>I</i></b></button></abbr>
            <abbr style="text-decoration: none;" title="Underline"><button class="toolbarBtn" id="underlineBtn" @click="underline" @mousedown="handleBtn"><b><u>U</u></b></button></abbr>
            <abbr style="text-decoration: none;" title="Strikethrough"><button class="toolbarBtn" id="strikeBtn" @click="strike" @mousedown="handleBtn"><b><s>S</s></b></button></abbr>
            <abbr style="text-decoration: none;" title="Insert heading"><button class="toolbarBtn" id="headingBtn" @click="heading" @mousedown="handleBtn"><b>H</b></button></abbr>
            <abbr style="text-decoration: none;" title="Type superscript"><button class="toolbarBtn" id="superscriptBtn" @click="superscript" @mousedown="handleBtn"><b>X<sup style="vertical-align: top; font-size: 0.7em;">2</sup></b></button></abbr>
            <abbr style="text-decoration: none;" title="Type subscript"><button class="toolbarBtn" id="subscriptBtn" @click="subscript" @mousedown="handleBtn"><b>X<sub style="vertical-align: bottom; font-size: 0.7em;">2</sub></b></button></abbr>
            <abbr style="text-decoration: none;" title="Clear formatting"><button class="toolbarBtn" id="clearBtn" @click="clear" @mousedown="handleBtn"><b><i><s>T</s></i></b></button></abbr>
            <abbr style="text-decoration: none;" title="Insert horizontal rule"><button class="toolbarBtn" id="hlineBtn" @click="hline" @mousedown="handleBtn"><b>–</b></button></abbr>
            <abbr style="text-decoration: none;" title="Highlight text"><button class="toolbarBtn" id="highlightBtn" style="width: 75px;" @click="highlight" @mousedown="handleBtn">Highlight</button></abbr>
            <input type="file" id="imageSelect" style="display: none;" @change="image"/>
            <abbr style="text-decoration: none;" title="Insert image"><button class="toolbarBtn" id="imageBtn" style="width: 55px;" onclick="document.querySelector('#imageSelect').click()">Image</button></abbr>
            <abbr style="text-decoration: none;" title="Insert math equation"><button class="toolbarBtn" id="mathBtn" style="width: 50px;" @click="math(true)" @mousedown="handleBtn">Math</button></abbr>
            <abbr style="text-decoration: none;" title="Toggle safe pasting"><button class="toolbarBtn" id="safepasteBtn" style="width: 85px;" @click="safepaste" @mousedown="handleBtn">Safe Paste</button></abbr>
        </div>
        <div id="highlightDropdown">
            <button @click="highlight('clear')" @mousedown="handleBtn"><b>Clear</b></button><br>
            <button @click="highlight('red')" @mousedown="handleBtn">Red</button><br>
            <button @click="highlight('green')" @mousedown="handleBtn">Green</button><br>
            <button @click="highlight('blue')" @mousedown="handleBtn">Blue</button><br>
            <button @click="highlight('yellow')" @mousedown="handleBtn">Yellow</button><br>
        </div>
        <mathEditor v-if="mathEditor" v-bind:lastLatex="lastLatex" @sendData="insertMath" />
        <div class="editor" @click="handleClick">
            <div class="info">
                <h1>{{ noteName }}</h1>
                <div style="width: 100%; height: 1px; background-color: rgb(220, 220, 220);"></div>
            </div>
            <div id="textarea" placeholder="Type something..." contenteditable @input="handleInput" @paste="handlePaste" @keyup="getStyle" @click="getStyle" spellcheck="false"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import mathEditor from '../components/mathEditor';

export default {
    name: "note",
    components: {
        mathEditor,
    },
    data() {
        return {
            noteId: null,
            noteName: "",
            noteContent: "",
            lastSave: "",
            lastName: "",
            focused: false,
            mathEditor: false,
            lastMath: "",
            lastLatex: "",
            safePaste: false
        }
    },
    methods: {
        clear: function() {
            document.execCommand('removeFormat', false, '');
            document.execCommand('formatBlock', false, 'div');
        },
        bold: function() {
            document.execCommand('bold', false, '');
            if(document.querySelector("#boldBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#boldBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#boldBtn").classList.add("toolbarHighlight");
            }
        },
        italic: function() {
            document.execCommand('italic', false, '');
            if(document.querySelector("#italicBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#italicBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#italicBtn").classList.add("toolbarHighlight");
            }
        },
        underline: function() {
            document.execCommand('underline', false, '');
            if(document.querySelector("#underlineBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#underlineBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#underlineBtn").classList.add("toolbarHighlight");
            }
        },
        strike: function() {
            document.execCommand('strikethrough', false, '');
            if(document.querySelector("#strikeBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#strikeBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#strikeBtn").classList.add("toolbarHighlight");
            }
        },
        superscript: function() {
            document.execCommand('superscript', false, '');
            if(document.querySelector("#superscriptBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#superscriptBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#superscriptBtn").classList.add("toolbarHighlight");
            }
        },
        subscript: function() {
            document.execCommand('subscript', false, '');
            if(document.querySelector("#subscriptBtn").classList.contains("toolbarHighlight")) {
                document.querySelector("#subscriptBtn").classList.remove("toolbarHighlight");
            } else  {
                document.querySelector("#subscriptBtn").classList.add("toolbarHighlight");
            }
        },
        hline: function() {
            document.execCommand('insertHorizontalRule', false, '');
        },
        heading: function() {
            document.execCommand('formatBlock', false, 'h2');
            document.querySelector("#headingBtn").classList.add("toolbarHighlight");
        },
        highlight: function(action) {
            switch(action) {
                case "clear":
                    document.execCommand('removeFormat', false, 'backColor');
                    break;
                case "red":
                    document.execCommand('backColor', false, 'red');
                    break;
                case "green":
                    document.execCommand('backColor', false, 'green');
                    break;
                case "blue":
                    document.execCommand('backColor', false, 'blue');
                    break;
                case "yellow":
                    document.execCommand('backColor', false, 'yellow');
                    break;
                default:
                    if(document.getElementById("highlightDropdown").style.display == "inline-block") {
                        document.getElementById("highlightDropdown").style.display = "none";
                        document.querySelector("#highlightBtn").classList.remove("toolbarHighlight");
                    } else {
                        document.getElementById("highlightDropdown").style.display = "inline-block";
                        document.querySelector("#highlightBtn").classList.add("toolbarHighlight");
                    }
                    break;
            }
        },
        safepaste: function() {
            if(!this.safePaste) {
                this.safePaste = true;
                document.querySelector("#safepasteBtn").classList.add("toolbarHighlight");
            } else {
                this.safePaste = false;
                document.querySelector("#safepasteBtn").classList.remove("toolbarHighlight");
            }
        },
        handleInput: function() {
            this.noteContent = document.getElementById("textarea").innerHTML;
            if(this.noteContent == "<div><br></div>" || this.noteContent == "<br>") {
                document.getElementById("textarea").innerHTML = "";
                this.noteContent = "";
            }
        },
        handlePaste: function(e) {
            if(this.safePaste) {
                // Prevent default behaviour
                e.preventDefault();
                // Get clipboard data
                var clipboard = e.clipboardData.getData('text/plain');
                // Insert text
                document.execCommand('insertText', false, clipboard);
            }
        },
        handleBtn: function(e) {
            e.preventDefault();
        },
        handleClick: function(e) {
            if(e.target.tagName == "IMG") {
                if(e.target.className == "mathImage") {
                    let id = e.target.id;
                    let latex = document.getElementById(id).getAttribute("alt");
                    this.editMath(id, latex);
                } else {
                    console.log("image");
                }
            }
        },
        image: function() {
            var file = document.querySelector("input[type=file]").files[0];
            this.insertImage(file);
        },
        insertImage: function(file) {
            var reader = new FileReader();

            reader.onload = function(e) {
                document.execCommand("InsertHTML", false, "<img src='" + e.target.result + "'/>");
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        math: function(state) {
            if(state == true) {
                // Generate id
                let firstPart = (Math.random() * 46656) | 0;
                let secondPart = (Math.random() * 46656) | 0;
                firstPart = ("000" + firstPart.toString(36)).slice(-3);
                secondPart = ("000" + secondPart.toString(36)).slice(-3);
                let id = "math" + firstPart + secondPart;
                this.lastMath = id;

                // Place image
                document.getElementById("textarea").focus();
                document.execCommand("InsertHTML", false, `<img class="mathImage" id="`+ id + `" src="" alt=""/>`);

                // Show editor
                this.lastLatex = "";
                this.mathEditor = true;
            } else {
                // Hide editor
                this.mathEditor = false;
            }
        },
        insertMath: function(latex) {
            console.log(latex);
            if(latex != "") {
                document.getElementById(this.lastMath).src = "https://latex.codecogs.com/gif.latex?" + latex;
                document.getElementById(this.lastMath).setAttribute("alt", latex);
            } else {
                document.getElementById(this.lastMath).remove();
            }
            this.noteContent = document.getElementById("textarea").innerHTML;
            this.math(false);
        },
        editMath: function(id, latex) {
            console.log(id + ": " + latex);
            this.lastMath = id;
            this.mathEditor = true;
            this.lastLatex = latex;
        },
        getStyle: function() {
            // Found this online. Don't know how it fully works lol
            // https://usefulangle.com/post/88/javascript-creating-simple-html-text-editor

            // Editor container 
            var editor_element = document.querySelector('#textarea');
            
            // No of ranges
            var num_ranges = window.getSelection().rangeCount;

            // Will hold parent tags of a range
            var range_parent_tags;

            // Will hold parent tags of all ranges
            var all_ranges_parent_tags = [];
                
            // Current menu tags
            var menu_tags = [ 'B', 'I', 'UL', 'U', 'STRIKE', 'SUP', 'SUB', 'H2' ];
                
            // Will hold common tags from all ranges
            var menu_tags_common = [];

            var start_element,
                end_element,
                cur_element;

            // For all ranges
            for(var i=0; i<num_ranges; i++) {
                // Start container of range
                start_element = window.getSelection().getRangeAt(i).startContainer;
                
                // End container of range
                end_element = window.getSelection().getRangeAt(i).endContainer;
                
                // Will hold parent tags of a range
                range_parent_tags = [];

                // If starting node and final node are the same
                if(start_element.isEqualNode(end_element)) {
                    // If the current element lies inside the editor container then don't consider the range
                    // This happens when editor container is clicked
                    if(editor_element.isEqualNode(start_element)) {
                        all_ranges_parent_tags.push([]);
                        continue;
                    }

                    cur_element = start_element.parentNode;
                    
                    // Get all parent tags till editor container    
                    while(!editor_element.isEqualNode(cur_element)) {
                        range_parent_tags.push(cur_element.nodeName);
                        cur_element = cur_element.parentNode;
                    }
                }

                // Push tags of current range 
                all_ranges_parent_tags.push(range_parent_tags);
            }

            // Find common parent tags for all ranges
            for(i=0; i<menu_tags.length; i++) {
                var common_tag = 1;
                for(var j=0; j<all_ranges_parent_tags.length; j++) {
                    if(all_ranges_parent_tags[j].indexOf(menu_tags[i]) == -1) {
                        common_tag = -1;
                        break;
                    }
                }

                if(common_tag == 1)
                    menu_tags_common.push(menu_tags[i]);
            }

            // Highlight menu for common tags
            if(menu_tags_common.indexOf('B') != -1)
                document.querySelector("#boldBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#boldBtn").classList.remove("toolbarHighlight");

            if(menu_tags_common.indexOf('I') != -1)
                document.querySelector("#italicBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#italicBtn").classList.remove("toolbarHighlight");

            if(menu_tags_common.indexOf('U') != -1)
                document.querySelector("#underlineBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#underlineBtn").classList.remove("toolbarHighlight");

            if(menu_tags_common.indexOf('STRIKE') != -1)
                document.querySelector("#strikeBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#strikeBtn").classList.remove("toolbarHighlight");

            if(menu_tags_common.indexOf('SUP') != -1)
                document.querySelector("#superscriptBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#superscriptBtn").classList.remove("toolbarHighlight");

            if(menu_tags_common.indexOf('SUB') != -1)
                document.querySelector("#subscriptBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#subscriptBtn").classList.remove("toolbarHighlight");
            
            if(menu_tags_common.indexOf('H2') != -1)
                document.querySelector("#headingBtn").classList.add("toolbarHighlight");
            else
                document.querySelector("#headingBtn").classList.remove("toolbarHighlight");
        },
        save: function() {
            axios(process.env.VUE_APP_SERVER + "/save", {
                method: "post",
                data: {id: this.noteId, data: this.noteContent, name: this.noteName},
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                this.lastSave = this.noteContent;
                this.lastName = this.noteName;
            });
        },
        load: function() {
            axios(process.env.VUE_APP_SERVER + "/notes", {
                method: "post",
                data: {id: this.noteId},
                withCredentials: true
            }).then(response => {
                console.log(response.data[0]);
                this.noteName = response.data[0].name;
                this.noteContent = response.data[0].data;
                document.getElementById("textarea").innerHTML = this.noteContent;
                this.lastSave = this.noteContent;
                this.lastName = this.noteName;
            });
        },
        remove: function() {
            if(confirm("Permanently remove this note?")) {
                axios(process.env.VUE_APP_SERVER + "/removenote", {
                    method: "post",
                    data: {id: this.noteId},
                    withCredentials: true
                }).then(response => {
                    console.log(response.data);
                    window.location.replace("/notes");
                });
            }
        }
    },
    mounted() {
        if(this.$cookie.get('loggedin') == "true") {
            this.noteId = this.$route.params.noteId;
            this.load();
        } else {
            window.location.replace("/login");
        }
    }
}
</script>

<style scoped>
html, body {
    
}
.toolbar {
    background-color: rgb(255, 255, 255);
    height: auto;
    width: 100%;
    padding: 0 0 0 10px;
    position: fixed;
    top: 0;
    
    white-space: nowrap;
    overflow: hidden;
    z-index: 1;
}
.toolbarBtn {
    cursor: pointer;
    background-color: white;
    color: rgb(50, 50, 50);
    border: none;
    outline: none;
    font-size: 14px;
    margin: 8px 2px 8px 2px;
    width: 27px;
    height: 25px;
    border-radius: 5px;
}
.toolbarHighlight {
    background-color: rgb(215, 234, 255) !important;
    color: rgb(75, 117, 255) !important;
}
.toolbarBtn:hover {
    background-color: rgb(240, 240, 240);
}
.info {
    margin: 50px auto auto auto;
    width: 900px;
    box-sizing: border-box;
    padding: 25px 40px 25px 40px;
}
.info h1 {
    font-size: 40px;
    color: rgb(50, 50, 50);
}
.editor {
    margin-top: 40px;
    overflow: auto;
    height: calc(100vh - 40px);
    width: 100%;
    letter-spacing: 0.8px;
}
[placeholder]:empty::before {
    content: attr(placeholder);
    color: rgb(150, 150, 150);
    cursor: text;
    letter-spacing: 1px;
}

[placeholder]:empty:focus::before {
    content: "";
}
#textarea {
    outline: none;
    padding: 25px 40px 25px 40px;
    box-sizing: border-box;
    word-wrap: break-word;
    width: 900px;
    margin: auto;
    color: rgb(50, 50, 50);
    font-size: 16px;
}
#textarea img {
    max-width: 900px;
}
#title {
    display: inline-block;
    padding: 2px 10px;
    margin: 8px 2px 8px 10px;
    color: rgb(50, 50, 50);
    font-size: 17px;
    cursor: pointer;
    border-radius: 5px;
}
#title:focus {
    background-color: rgb(240, 240, 240);
    border-radius: 5px;
}
#title:hover {
    background-color: rgb(240, 240, 240);
    border-radius: 5px;
}
#highlightDropdown {
    background-color: white;
    position: fixed;
    margin: 5px 0 0 374px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.151);
    padding: 5px 10px 10px 10px;
    border-radius: 5px;
    display: none;
}
#highlightDropdown button {
    cursor: pointer;
    background-color: white;
    color: rgb(66, 66, 66);
    border: none;
    outline: none;
    font-size: 13px;
    width: 55px;
    height: 25px;
    border-radius: 5px;
    margin: 0 0 4px 0;
}
#highlightDropdown button:hover {
    background-color: rgb(240, 240, 240);
}
img {
    cursor: pointer;
}
::selection {
  background: rgb(215, 234, 255);
}
::-moz-selection {
  background: rgb(215, 234, 255);
}
#saveBtn {
    float: right;
    background-color: rgb(75, 117, 255);
    color: white;
    font-size: 14px;
    border: 2px solid rgb(75, 117, 255);
    border-radius: 5px;
    padding: 6px 15px;
    cursor: pointer;
    margin-top: -12px;
}
#savedBtn {
    float: right;
    background-color: rgb(160, 160, 160);
    color: white;
    font-size: 14px;
    border: 2px solid rgb(160, 160, 160);
    border-radius: 5px;
    padding: 6px 15px;
    cursor: pointer;
    margin-top: -12px;
}
#removeBtn {
    font-weight: 100;
    text-decoration: underline;
    float: right;
    color: rgb(80, 80, 80);
    font-size: 12px;
    cursor: pointer;
    margin: 6px 10px 0 0;
}
</style>