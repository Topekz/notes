<template>
    <div class="container">
        <div id="header">
            <div id="background"></div>
            <div id="left">
                <p id="title">Fast and organised<br>way to take notes.</p>
                <p id="desc">Take, organise and customise notes<br>using a simple interface.</p>
                <button @click="$router.push('/login')" style="margin-top: 25px;" class="strokeBtn">Log In</button>
                <button @click="$router.push('/register')" style="margin-left: 10px;" class="filledBtn">Get Started</button>
            </div>
            <img src="../assets/FramedScreenshot.png" alt="note screenshot">
        </div>
    </div>
</template>

<script>
export default {
    name: "landing",
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        if(this.$cookie.get('loggedin') == "true") {
            window.location.replace("/home");
        }
    }
}
</script>

<style scoped>
#header {
    
}
#header #background {
    background-color: #dceaff;
    position: fixed;
    width: 120%;
    height: 43vw;
    transform: rotate(3deg);
    z-index: -1;
    top: -50px;
    left: -50px;
}
#header #left {
    display: inline-block;
    margin: 80px 0 0 100px;
}
#header #title {
    color: #303030;
    font-size: 3.5vw;
    font-weight: 400;
    margin-bottom: 0;
}
#header #desc {
    color: #404040;
    font-size: 1.5vw;
}
#header img {
    height: auto;
    width: 50vw;
    float: right;
    margin: 90px 100px 0 0;
}
.filledBtn {
  background-color: rgb(75, 117, 255);
  color: white;
  font-size: 1.2vw;
  border: 2px solid rgb(75, 117, 255);
  border-radius: 5px;
  padding: 0.8vw 2vw;
  cursor: pointer;
  font-weight: 600;
}
.strokeBtn {
  background-color: transparent;
  color: rgb(75, 117, 255);
  font-size: 1.2vw;
  border: 2px solid rgb(75, 117, 255);
  border-radius: 5px;
  padding: 0.8vw 1.8vw;
  cursor: pointer;
  font-weight: 600;
}
</style>