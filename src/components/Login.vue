<template>
  <form novalidate @submit.prevent="checkForm">
    <div class="text-center mb-4">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
    </div>
    <div class="form-label-group">
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
        required
        autofocus
      />
      <label for="inputEmail">Email address</label>
    </div>

    <div class="form-label-group">
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        v-model="password"
        placeholder="Password"
        required
      />
      <label for="inputPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label> <input type="checkbox" value="remember-me" /> Remember me </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      Sign in
    </button>
  </form>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    checkForm(event) {
      event.target.classList.add("was-validated");
      if (event.target.checkValidity()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // console.log(data);
            this.$router.replace({ name: "dashboard" });
          })
          .catch(err => {
            this.message = err.message;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}
</style>
