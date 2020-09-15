<template>
    <div id="mathBackground">
        <div id="mathEditor">
            <input @keyup.enter="sendData" type="text" id="mathInput" v-model="latex" />
            <button @click="hide" style="background-color: rgb(185, 80, 80);">Cancel</button>
            <button @click="sendData">Insert</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "mathEditor",
    mounted() {
        //https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.css
        //https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
        //https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js
        document.getElementById("mathInput").focus();
        if(this.lastLatex != "") {
            this.latex = this.lastLatex;
        }
    },
    components: {

    },
    props: [
        'lastLatex'
    ],
    data() {
        return {
            latex: ""
        }
    },
    methods: {
        sendData: function() {
            this.$emit("sendData", this.latex);
        },
        hide: function() {
            this.$emit("hide", false);
        }
    }
}
</script>

<style>
#mathBackground {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(1, 1, 1, 0.06);
    width: 100%;
    height: 100%;
    z-index: 10;
}
#mathEditor {
    width: 600px;
    margin: 120px auto auto auto;
}
#mathInput {
    width: 600px;
    height: 60px;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
}
#mathEditor button {
    background-color: rgb(38, 104, 212);
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 7px;
    color: white;
    width: 90px;
    height: 35px;
    cursor: pointer;
    margin: 5px 10px 0 0;
}
</style>