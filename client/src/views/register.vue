<template>
    <div class="container">
        <h1>Register</h1>
        <div class="register">
            <p v-if="errorMsg.length > 0">{{ errorMsg }}</p>
            <input v-model="name" pattern="^[0-9a-zA-Z]+$" style="text-transform: lowercase" type="text" name="name" id="name">
            <input v-model="password" pattern="^[a-zA-Z\d\-_.,#@!?€$&%+*^'/\\s]+$" type="password" name="password" id="password">
            <button @click="register" id="submit">Submit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "register",
    data() {
        return {
            name: "",
            password: "",
            errorMsg: ""
        }
    },
    methods: {
        register: function() {
            axios(process.env.VUE_APP_SERVER + '/register', {
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