import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import firebaseConfig from "./firebase-config";
import store from "./store";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("fetchUser", user);
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
