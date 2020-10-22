<template>
    <div class="container">
        <h1 @click="$router.push('/')" style="cursor: pointer;">Notes</h1>
        <div id="box">
            <p id="title">Create your account</p>
            <p class="inputTitle">Username <span class="required">*</span></p>
            <input v-model="name" v-on:keyup.enter="register" pattern="^[0-9a-zA-Z]+$" style="text-transform: lowercase" type="text" name="name" id="name"><br>
            <p class="inputTitle">Password <span class="required">*</span></p>
            <input v-model="password" v-on:keyup.enter="register" pattern="^[a-zA-Z\d\-_.,#@!?€$&%+*^'/\\s]+$" type="password" name="password" id="password"><br>
            <p class="inputTitle">Confirm password <span class="required">*</span></p>
            <input v-model="passwordConfirm" v-on:keyup.enter="register" pattern="^[a-zA-Z\d\-_.,#@!?€$&%+*^'/\\s]+$" type="password" name="passwordConfirm" id="passwordConfirm">
            <button @click="register" id="submit">Create account</button>
            <p id="errorMsg" v-if="errorMsg.length > 0">{{ errorMsg }}</p>
        </div>
        <p id="login" @click="$router.push('/login')">Already have an account?</p>
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
            passwordConfirm: "",
            errorMsg: ""
        }
    },
    methods: {
        register: function() {
            if(this.name != "" && this.password != "" && this.password != "") {
                if(this.password === this.passwordConfirm) {
                    axios(process.env.VUE_APP_SERVER + '/register', {
                        method: 'post',
                        data: {username: this.name, password: this.password},
                        withCredentials: true
                    }).then(response => {
                        console.log(response.data);
                        if(response.data.success == true) {
                            this.errorMsg = "";
                            window.location.replace("/login");
                        } else {
                            this.name = "";
                            this.password = "";
                            this.passwordConfirm = "";
                            this.errorMsg = response.data.msg;
                        }
                    });
                } else {
                    this.password = "";
                    this.passwordConfirm = "";
                    this.errorMsg = "Passwords do not match";
                }
            } else {
                this.errorMsg = "Cannot leave empty fields";
            }
        }
    }
}
</script>

<style scoped>
.container {
    text-align: center;
}
#box {
    height: auto;
    width: 400px;
    margin: 20vh auto auto auto;
    text-align: center;
    padding: 20px;
    border: 1px solid #8A8A8A;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
#box input {
    width: 100%;
    height: 40px;
    padding: 5px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #8A8A8A;
    box-sizing: border-box;
    color: rgb(39, 39, 39);
    margin: 0 0 10px 0;
}
#box button {
  background-color: rgb(75, 117, 255);
  color: white;
  font-size: 14px;
  border: 2px solid rgb(75, 117, 255);
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px 0;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
}
.inputTitle {
    float: left;
    margin: 0;
    color: rgb(17, 17, 17);
    font-size: 15px;
    margin-bottom: 2px;
}
.required {
    color: red;
}
#title {
    font-size: 26px;
    padding: 0 0 30px 0;
    width: 400px;
    position: relative;
    margin: 0;
}
#errorMsg {
    margin: 15px 0 0 0;
    font-size: 14px;
    color: rgb(235, 50, 50);
    font-weight: 700;
}
#login {
    color: rgb(75, 117, 255);
    margin-right: 250px;
    cursor: pointer;
}
</style>