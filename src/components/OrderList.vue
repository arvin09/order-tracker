<template>
  <div>
    <div v-if="showLoader" class="loader d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="!showLoader" class="card orders">
      <div class="card-header bg-info">
        Orders list
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="order in orders" :key="order.id">
          {{ order.id }} - {{ order.customer.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
      showLoader: true
    };
  },
  mounted() {
    const db = firebase.firestore();
    const self = this;
    db.collection("Orders")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let order = {};
          order = doc.data();
          order.id = doc.id;
          doc
            .data()
            .customerId.get()
            .then(customer => {
              order.customer = customer.data();
              self.orders.push(order);
              this.showLoader = false;
            })
            .catch(error => {
              console.log("Error getting documents: ", error);
            });
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loader {
  margin: 8rem !important;

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
}
</style>
