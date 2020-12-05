<template>
  <div id="app">
    <sidebar id="sidebar" v-if="!blacklist.includes($router.currentRoute.path)"/>
    <router-view/>
  </div>
</template>

<script>
import sidebar from './components/sidebar';

export default {
  name: 'App',
  components: {
    sidebar
  },
  data() {
    return {
      blacklist: ['/','/404','/register','/login']
    }
  },
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
body {
  padding: 0;
  margin: 0 0 0 240px;
  font-family:Arial, Helvetica, sans-serif;
  background-color: white;
}
#sidebar {
  z-index: 9;
  margin: 0 0 0 -240px;
  width: 240px;
}
</style>
