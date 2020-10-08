<template>
    <div class="container">
        <h1>Log In</h1>
        <div class="register">
            <p v-if="errorMsg.length > 0">{{ errorMsg }}</p>
            <input v-model="name" type="text" name="name" id="name">
            <input v-model="password" type="password" name="password" id="password">
            <button @click="register" id="submit">Log In</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "login",
    data() {
        return {
            name: "",
            password: "",
            errorMsg: ""
        }
    },
    methods: {
        register: function() {
            axios(process.env.VUE_APP_SERVER + '/login', {
                method: 'post',
                data: {username: this.name, password: this.password},
                withCredentials: true
            }).then(response => {
                console.log(response.data);
            });
        }
    }
}
</script>

<style>

</style>