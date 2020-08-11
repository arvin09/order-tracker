<template>
  <div class="card orders">
    <div class="card-header bg-info">
      Orders list
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="order in orders" :key="order.id">
        {{ order.id }} - {{ order.customer.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "OrderList",
  props: {
    orders: {
      type: Array,
      default: () => []
    }
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
.orders {
  margin-top: 20px;
}
</style>
