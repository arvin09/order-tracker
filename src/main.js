import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import firebaseConfig from "./firebase-config";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);
console.log(process.env);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
