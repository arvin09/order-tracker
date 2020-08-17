<template>
  <div class="new-order">
    <NewOrder />
  </div>
</template>

<script>
// @ is an alias to /src
import NewOrder from "@/components/NewOrder.vue";

export default {
  name: "Order",
  components: {
    NewOrder
  }
};
</script>
