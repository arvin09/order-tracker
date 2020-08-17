<template>
  <div class="order-list">
    <div v-if="showLoader" class="loader d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="!showLoader" class="orders-list">
      <div class="header">All Orders</div>
      <ul class="list-group">
        <li
          class="list-group-item order"
          v-for="order in orders"
          :key="order.id"
        >
          <router-link :to="{ name: 'orderDetail', params: { order } }">
            <div class="row">
              <div class="col-sm">
                <ul class="list-group">
                  <li class="order__detail--id">Order {{ order.id }}</li>
                  <li class="order__detail--customer-name">
                    Customer {{ order.customer.name }}
                  </li>
                  <li class="order__detail--order-date">
                    Placed on {{ order.created }}
                  </li>
                  <li class="order__detail--order-date">
                    Sales by {{ order.salesperson }}
                  </li>
                </ul>
              </div>
              <div class="col-lg">
                <ul class="list-group">
                  <li class="order__completed--label">Completed</li>
                  <li class="order__completed--percent">45%</li>
                  <li class="order__completed--progress">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 45%;"
                        aria-valuenow="45"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-lg d-none d-sm-block">
                <ul class="list-group">
                  <li class="order__expected--label">Expected Completion</li>
                  <li class="order__expected--date">
                    {{ order.deliveryDate }}
                  </li>
                  <li class="order__expected--days">
                    {{ order.remainingDays }}
                  </li>
                </ul>
              </div>
            </div>
          </router-link>
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
      db: null,
      orders: [],
      showLoader: true,
      order: "Test"
    };
  },
  created() {
    this.db = firebase.firestore();
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      const self = this;
      this.db
        .collection("Orders")
        .orderBy("created", "desc")
        .onSnapshot(orders => {
          self.orders = [];
          orders.forEach(function(doc) {
            let order = {};
            order = doc.data();
            order.id = doc.id;
            doc
              .data()
              .customerId.get()
              .then(customer => {
                order.customer = customer.data();
                order.remainingDays = self.getDateDiff(
                  order.created.seconds,
                  order.deliveryDate.seconds
                );
                order.deliveryDate = self.getDate(order.deliveryDate.seconds);
                order.created = self.getDate(order.created.seconds);
                self.orders.push(order);
                self.showLoader = false;
              })
              .catch(error => {
                console.log("Error getting documents: ", error);
              });
          });
        });
    },
    getDateDiff(createdDate, deliveryDate) {
      const d1 = this.getDate(createdDate, false);
      const d2 = this.getDate(deliveryDate, false);

      var Difference_In_Time = d2.getTime() - d1.getTime();

      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return `${Difference_In_Days} ${Difference_In_Days > 1 ? "Days" : "Day"}`;
    },
    getDate(seconds, format = true) {
      const months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
      };
      const d = new Date();
      d.setTime(seconds * 1000);
      if (!format) {
        return d;
      } else {
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orders-list {
  font-weight: bolder;
  padding: 10px;

  .header {
    margin-bottom: 15px;
    font-size: 20px;
  }

  ul li {
    list-style-type: none;
  }

  .order {
    border-top-width: 1px;
    box-shadow: 10px 10px 5px 0px #a1a1a1bf;
    margin-bottom: 20px;
    // border-radius: 10px;

    a {
      text-decoration: none;
      color: inherit;
    }

    &__detail {
      &--id {
        font-size: 26px;
        font-weight: bolder;
      }
      &--customer-name,
      &--order-date {
        font-size: 14px;
        opacity: 0.8;
      }
    }

    &__completed {
      &--label {
        font-weight: bolder;
      }
      &--percent {
        font-weight: bolder;
        font-size: 30px;
      }
      &--progress {
        .progress {
          height: 8px;
          .progress-bar {
            background-color: #f2684e;
          }
        }
      }
    }

    &__expected {
      &--label {
        font-weight: bolder;
        margin-bottom: 15px;
      }
      &--date {
        font-weight: bolder;
        font-size: 14px;
      }
      &--days {
        font-size: 14px;
        opacity: 0.8;
      }
    }
  }

  .number {
    font-size: 20px;
  }
}
.loader {
  margin: 8rem !important;

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
}
</style>
