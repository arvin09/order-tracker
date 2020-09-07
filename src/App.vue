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

form {
  .header {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bolder;
  }
  .form-label-group {
    position: relative;
    margin-bottom: 1rem;

    input,
    select,
    label {
      height: 3.125rem;
      padding: 0.75rem;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      margin-bottom: 0; /* Override default `<label>` margin */
      line-height: 1.5;
      color: #495057;
      pointer-events: none;
      cursor: text; /* Match the input under the label */
      border: 1px solid transparent;
      border-radius: 0.25rem;
      transition: all 0.1s ease-in-out;
    }

    input::placeholder {
      color: transparent;
    }

    input:not(:placeholder-shown) {
      padding-top: 1.25rem;
      padding-bottom: 0.25rem;
    }

    input:not(:placeholder-shown) ~ label {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      font-size: 12px;
      color: #777;
    }
  }

  /* Fallback for Edge
-------------------------------------------------- */
  @supports (-ms-ime-align: auto) {
    .form-label-group {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
    }

    .form-label-group label {
      position: static;
    }

    .form-label-group input::-ms-input-placeholder {
      color: #777;
    }
  }
}
</style>
