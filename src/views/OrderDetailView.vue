<template>
  <div class="order-detail">
    <OrderDetail :order="order" />
  </div>
</template>

<script>
// @ is an alias to /src
import OrderDetail from "@/components/OrderDetail.vue";

export default {
  name: "OrderDetailView",
  components: {
    OrderDetail
  },
  props: ["order"]
};
</script>
