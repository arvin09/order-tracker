<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar navbar-dark bg-dark">
    <!-- <a class="navbar-brand" href="#"> -->
    <router-link to="/" class="navbar-brand nav-link"
      >Order Tracker</router-link
    >
    <!-- </a> -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="newOrder" class="nav-link">Create</router-link>
        </li>
      </ul>
      <div class="navbar-nav nav-item my-2 my-lg-0">
        <span class="nav-item">
          <a href="#" class="nav-link" @click="signout"> Sign out</a>
        </span>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      user: "user"
    }),
    isSignedIn() {
      return this.user && this.user.isLoggedIn ? true : false;
    }
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "/" });
          // TODO: debug for this work around
          window.location.reload();
        });
    }
  }
};
</script>
