<template>
    <div class="container">
        <div class="toolbar">
            <p id="logo" onclick="window.location.href='/'">Notes</p>
            <input type="text" v-model="noteName" id="title">
            <br>
            <abbr style="text-decoration: none;" title="Bold"><button class="toolbarBtn" id="boldBtn" @click="bold" @mousedown="handleBtn"><b>B</b></button></abbr>
            <abbr style="text-decoration: none;" title="Italic"><button class="toolbarBtn" id="italicBtn" @click="italic" @mousedown="handleBtn"><b><i>I</i></b></button></abbr>
            <abbr style="text-decoration: none;" title="Underline"><button class="toolbarBtn" id="underlineBtn" @click="underline" @mousedown="handleBtn"><b><u>U</u></b></button></abbr>
            <abbr style="text-decoration: none;" title="Strikethrough"><button class="toolbarBtn" id="strikeBtn" @click="strike" @mousedown="handleBtn"><b><s>S</s></b></button></abbr>
            <abbr style="text-decoration: none;" title="Insert heading"><button class="toolbarBtn" id="headingBtn" @click="heading" @mousedown="handleBtn"><b>H</b></button></abbr>
            <abbr style="text-decoration: none;" title="Type superscript"><button class="toolbarBtn" id="superscriptBtn" @click="superscript" @mousedown="handleBtn"><b>X<sup style="vertical-align: top; font-size: 0.7em;">2</sup></b></button></abbr>
            <abbr style="text-decoration: none;" title="Type subscript"><button class="toolbarBtn" id="subscriptBtn" @click="subscript" @mousedown="handleBtn"><b>X<sub style="vertical-align: bottom; font-size: 0.7em;">2</sub></b></button></abbr>
            <abbr style="text-decoration: none;" title="Clear formatting"><button class="toolbarBtn" id="clearBtn" @click="clear" @mousedown="handleBtn"><b><i><s>T</s></i></b></button></abbr>
            <abbr style="text-decoration: none;" title="Insert horizontal rule"><button class="toolbarBtn" id="hlineBtn" @click="hline" @mousedown="handleBtn"><b>–</b></button></abbr>
            <abbr style="text-decoration: none;" title="Highlight text"><button class="toolbarBtn" id="highlightBtn" style="width: 80px;" @click="highlight" @mousedown="handleBtn">Highlight</button></abbr>
            <input type="file" id="imageSelect" style="display: none;" @change="image"/>
            <abbr style="text-decoration: none;" title="Insert image"><button class="toolbarBtn" id="imageBtn" style="width: 60px;" onclick="document.querySelector('#imageSelect').click()">Image</button></abbr>
            <abbr style="text-decoration: none;" title="Insert math equation"><button class="toolbarBtn" id="mathBtn" style="width: 55px;" @click="math(true)" @mousedown="handleBtn">Math</button></abbr>
        </div>
        <div id="highlightDropdown">
            <button @click="highlight('clear')"><b>Clear</b></button><br>
            <button @click="highlight('red')">Red</button><br>
            <button @click="highlight('green')">Green</button><br>
            <button @click="highlight('blue')">Blue</button><br>
            <button @click="highlight('yellow')">Yellow</button><br>
        </div>
        <div class="editor" @click="handleClick">
            <mathEditor v-if="mathEditor" v-bind:lastLatex="lastLatex" @sendData="insertMath" />
            <div id="textarea" contenteditable @input="handleInput" @keyup="getStyle" @click="getStyle" spellcheck="false"></div>
            <button v-on:click="save">Save</button>
            <button v-on:click="load">Load</button>
        </div>
    </div>
</template>

<script>
import mathEditor from '../components/mathEditor';

export default {
    name: "note",
    components: {
        mathEditor,
    },
    data() {
        return {
            noteId: null,
            noteName: "My note name",
            noteContent: "",
            focused: false,
            mathEditor: false,
            lastMath: "",
            lastLatex: ""
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
        handleInput: function(e) {
            this.noteContent = e.target.innerHTML;
        },
        handleBtn: function(e) {
            e.preventDefault();
        },
        handleClick: function(event) {
            if(event.target.className == "mathImage") {
                let id = event.target.id;
                let latex = document.getElementById(id).src.replace('https://latex.codecogs.com/gif.latex?','');
                this.editMath(id, latex);
            }
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
            var menu_tags = [ 'B', 'I', 'UL', 'U', 'S', 'SUP', 'SUB', 'H2' ];
                
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

            if(menu_tags_common.indexOf('S') != -1)
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
        image: function() {
            var file = document.querySelector("input[type=file]").files[0];
            var reader = new FileReader();
            let dataURI;

            reader.addEventListener(
                "load",
                function() {
                    dataURI = reader.result;

                    const img = document.createElement("img");
                    img.src = dataURI;
                    document.execCommand("InsertHTML", false, "<img src='" + img.src + "'/>");
                },
                false
            );
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
                let id = firstPart + secondPart;
                this.lastMath = id;

                // Place image
                document.getElementById("textarea").focus();
                document.execCommand("InsertHTML", false, `<img class="mathImage" id="`+ id + `" src="" />`);

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
            document.getElementById(this.lastMath).src = "https://latex.codecogs.com/gif.latex?" + latex;
            this.math(false);
        },
        editMath: function(id, latex) {
            console.log(id + ": " + latex);
            this.lastMath = id;
            this.mathEditor = true;
            this.lastLatex = latex;
        },
        save: function() {
            
        },
        load: function() {
            this.noteContent = "";
            document.getElementById("textarea").innerHTML = this.noteContent;
        }
    },
    async created() {
        this.noteId = this.$route.params.noteId; 
    }
}
</script>

<style>
body {
    background-color: rgb(248, 249, 250);
}
.container {

}
.editor {
    margin: auto;
    padding: 95px 50px 10px 50px;
    width: 800px;
}
.toolbar {
    background-color: white;
    height: auto;
    width: 100%;
    padding: 0 100px 0 100px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.151);
    white-space: nowrap;
    overflow: hidden;
    z-index: 1;
}
.toolbarBtn {
    cursor: pointer;
    background-color: white;
    color: rgb(66, 66, 66);
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
    background-color: rgb(248, 249, 250);
}
#textarea {
    background-color: white;
    outline: none;
    width: 100%;
    min-height: 1120px;
    box-sizing: border-box;
    padding: 25px;
    word-wrap: break-word;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.151);
}
#textarea img {
    max-width: 900px;
}
#logo {
    font-size: 18px;
    margin: 13px 42px -20px 2px;
    padding: 0;
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
}
#title {
    display: inline-block;
    margin: 0;
    padding: 0;
    color: rgb(0, 0, 0);
    font-size: 17px;
    border: none;
    padding: 2px 10px;
    box-sizing: border-box;
}
#title:focus {
    background-color: rgb(248, 249, 250);
    border-radius: 5px;
}
#title:hover {
    background-color: rgb(248, 249, 250);
    border-radius: 5px;
}
#highlightDropdown {
    background-color: white;
    position: fixed;
    margin: 65px 0 0 381px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.151);
    padding: 20px 10px 10px 10px;
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
    width: 60px;
    height: 25px;
    border-radius: 5px;
    margin: 0 0 4px 0;
}
#highlightDropdown button:hover {
    background-color: rgb(248, 249, 250);
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
</style>