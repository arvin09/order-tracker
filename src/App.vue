<template>
  <div id="app" class="container-fluid">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}
#app {
  font-family: "Manrope", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
body {
  min-height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  background-color: #f7f6fb;
}

body::after {
  content: "";
  display: block;
  height: 100px;
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
