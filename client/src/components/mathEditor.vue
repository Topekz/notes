<template>
    <div id="mathBackground">
        <div id="mathEditor">
            <input @keyup.enter="sendData" type="text" id="mathInput" v-model="latex" placeholder="Write LaTeX..."/>
            <div id="latex" v-if="latex != ''"><vue-mathjax :formula="'$' + latex + '$'"></vue-mathjax></div>
            <br>
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

<style scoped>
#mathBackground {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(1, 1, 1, 0.07);
    width: 100%;
    height: 100%;
    z-index: 10;
}
#mathEditor {
    width: 600px;
    background-color: white;
    margin: 120px auto auto auto;
    border-radius: 5px;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 5px;
}
#mathInput {
    width: 600px;
    height: 60px;
    font-size: 16px;
    padding: 15px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid rgb(185, 185, 185);
    border-radius: 5px 5px 0 0;
}
#latex {
    margin: 15px 0 -15px 15px;
}
#mathEditor button {
    background-color: rgb(52, 120, 230);
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 7px;
    color: white;
    width: 90px;
    height: 35px;
    cursor: pointer;
    margin: 15px 0 15px 15px;
}
</style>