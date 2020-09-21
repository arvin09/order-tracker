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
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/newOrder",
    name: "newOrder",
    component: Order,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: OrderDetail,
    props: true,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const store = await import("../store");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    setTimeout(() => {
      if (store.default.getters.user.isLoggedIn) {
        next();
        return;
      }
    }, 0);
  }

  if (to.path === "/orderDetail" && to.params !== null) {
    next("/dashboard");
  }
  next();
});

export default router;
