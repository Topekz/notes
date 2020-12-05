<template>
    <div class="container">
        <h1>Title</h1>
        <button @click="create">Create</button>
        <button @click="get">Get</button>
        <button @click="set">Set</button>
        <div id="content">

        </div>
    </div>
</template>

<script>
export default {
    name: "test",
    components: {
        
    },
    data() {
        return {
            content: []
        }
    },
    methods: {
        create: function() {
            let firstPart = (Math.random() * 46656) | 0;
            let secondPart = (Math.random() * 46656) | 0;
            firstPart = ("000" + firstPart.toString(36)).slice(-3);
            secondPart = ("000" + secondPart.toString(36)).slice(-3);
            let id = "obj" + firstPart + secondPart;

            var element = document.createElement("div");
            element.appendChild(document.createTextNode('Test'));
            element.setAttribute("class", "text");
            element.setAttribute("id", id);
            element.setAttribute("contenteditable", true);
            document.getElementById('content').appendChild(element);
        },
        get: function() {
            this.content = document.getElementById("content").innerHTML;
        },
        set: function() {
            document.getElementById("content").innerHTML = this.content;
        }
    }
}
</script>

<style scoped>

</style>