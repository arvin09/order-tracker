import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Order from "../views/NewOrderView.vue";
import OrderDetail from "../views/OrderDetailView.vue";
import Login from "@/components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/newOrder",
    name: "newOrder",
    component: Order
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: OrderDetail,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/orderDetail" && to.params !== null) {
    next("/");
  }
  next();
});

export default router;
